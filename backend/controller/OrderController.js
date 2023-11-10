
const Order = require('../model/Order')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const Medicine = require("../model/Medicine");
const PatientModel = require("../model/Patient")
const OrderModel = require("../model/Order")
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// View My Orders
const viewMyOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    } catch (error) {
        throw new Error(error.message)
    }
})

// Add Order
const addOrder = asyncHandler(async (req, res) => {
    const orderBody = req.body
    try {
        const order = await Order.create(orderBody);
        res.status(200).json(order)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

// Delete Order by id
const deleteOrder = asyncHandler((async (req, res) => {
    const {id} = req.params
    const order = await Order.findOne({id})
    if (!order) {
        return res.status(404).json({message: 'Order not found'});
    }
    await order.deleteOne({id})
    res.json({message: 'Medicine deleted successfully'});
}))

// Set Payment to be Credit Card only if justAddedOrder is true


//choose to pay with wallet, or credit card (using Stripe)

const cardPayment = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({justAddedOrder: true});
        if (!orders) {
            return res.status(404).json({message: "No orders found"});
        }

        for (const order of orders) {
            order.paymentOption = "CreditCard";
            await order.save();
        }

        res.status(200).json({message: "Payment option set to CreditCard for eligible orders"});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
});

// Set Payment to be Cash only if justAddedOrder is true
const cashPayment = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({justAddedOrder: true});
        if (!orders) {
            return res.status(404).json({message: "No orders found"});
        }

        for (const order of orders) {
            order.paymentOption = "CashOnDelivery";
            await order.save();
        }

        res.status(200).json({message: "Payment option set to Cash on Delivery"});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
});

// When i Place order, toBeDisplayed is set to true, and justAddedOrder is set to false
// (to orders that  justAddedOrder is true)
const confirmOrder = asyncHandler(async (req, res) => {
    const { orderID, paymentOption, address } = req.params
    try {
        const orders = await Order.find({_id: orderID})
        if (!orders) {
            return res.status(404).json({message: "No orders found"});
        }
        for (const order of orders) {
            order.toBeDisplayed = true;
            order.justAddedOrder = false;
            order.paymentOption = paymentOption;
            order.selectedAddress = address;
            await order.save();
        }
        res.status(200).json({message: "Order Confirmed"});

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
})

// View Orders Whose toBeDisplayed is set to true
const displayConfirmedOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({toBeDisplayed: true})
        if (!orders) {
            return res.status(404).json({message: "No orders found"})
        }
        res.status(200).json(orders)
    } catch (error) {
        throw new Error(error.message)
    }
})

// View ID,Status and Payment of each order
const viewOrderDetails = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({ toBeDisplayed: true }, 'id status paymentOption');
        res.status(200).json(orders);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// Set Total Price of those justAddedOrder to be subtotal + 50
const setTotalPrice = asyncHandler(async (req, res) => {
    try {
        const { subtotal } = req.params;
        const orders = await Order.find({ justAddedOrder: true });

        for (const order of orders) {
            order.totalPrice = parseInt(subtotal) + 50;
            await order.save();
        }
        res.status(200).json({ message: "Total price updated for eligible orders" });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// Delete Order by Id
const cancelOrder = asyncHandler(async (req,res)=>{
    try{
        const {id} = req.params
        const order = await Order.findOne({id})
        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        }
        await order.deleteOne({id})
        res.json({message: 'Order cancelled successfully'});
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const payForOrder = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const { orderID, paymentOption } = req.params; // Extract payment method and amount from request body
    try {
      const patient = await PatientModel.findById(id)
      //const healthPackage = await HealthPackageModel.findOne({_id:packageID})
      const order = await OrderModel.findOne({_id:orderID})
      const amount = order.totalPrice
      if(!order){
        throw new Error("invalid order")
      }
      //const amount = await healthPackage.yearlySubscription
      if (paymentOption === 'Wallet') {
        if(patient.wallet < amount){
          res.status(400)
          throw new Error("Wallet balance insufficient.")
        } else {
          const newWallet = patient.wallet - amount;
          const newPatient = await PatientModel.findOneAndUpdate({_id:id},{wallet:newWallet})
          const newOrder = await OrderModel.findOneAndUpdate({_id:orderID},{status:"Paid"})
          res.status(200).json(newOrder);
        }
      }
      else if (paymentOption === 'CreditCard') {
        const session = await stripe.checkout.sessions.create({
          billing_address_collection: 'auto',
          line_items: [
            {
              price_data: {
                product_data:{
                  //name: healthPackage.packageName + ' Health Package',
                  name: order.id + ' Order',
                },
                unit_amount: amount*100,
                currency: 'egp',
              },
              quantity: 1,
            },
          ],
          mode: 'payment', //change to 'payment' if not a subscription
          
          success_url: `http://localhost:3000/paymentSuccess?sessionID={CHECKOUT_SESSION_ID}`,
          cancel_url: 'http://localhost:3000/paymentCancel',
          metadata: {
            'patientID': req.user.id.toString(),
            'orderID': orderID.toString()
          }
        });
        res.status(200).json(session)
      }
      else if (paymentOption === 'CashOnDelivery') {
        const order = await OrderModel.findOneAndUpdate({_id:orderID},{status:"WaitingOnDelivery"})
        res.status(200).json(order);
        
      } 
      else {
        return res.status(400).json({ error: 'Invalid payment method' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  const completeCreditPayment = asyncHandler(async (req, res) => {
    const { sessionID } = req.params
    const session = await stripe.checkout.sessions.retrieve(
        sessionID,
        {
          expand: ['line_items'],
        }
    );
    if(session.payment_status==="paid"){
        const orderID = session.metadata.orderID
        const order = await OrderModel.findOneAndUpdate({_id:orderID},{status:"Paid"})
        res.status(200).json(order)
    } else {
        res.status(400)
        throw new Error('Payment unsuccessful')
    }
  })

  const choosePayment= asyncHandler(async (req, res) => {
    const { sessionID } = req.params
    const session = await stripe.checkout.sessions.retrieve(
      sessionID,
      {
        expand: ['line_items'],
      }
    );
    console.log(await session)
    console.log(await session.payment_status)
    const patientID = session.metadata.patientID
    const orderID = session.metadata.packageID
   
    try{
     const patient= await PatientModel.create({patientID:patientID},)
        const order = await OrderModel.findOneAndUpdate({_id:orderID},{status:"Paid"})
        res.status(200).json(order)
      
    }
    catch (error) {
      res.status(400).json(error.message)
    }
  })

module.exports = {
    viewMyOrders,
    addOrder,
    deleteOrder,
    cardPayment,
    cashPayment,
    confirmOrder,
    displayConfirmedOrders,
    viewOrderDetails,
    setTotalPrice,
    cancelOrder,
    payForOrder,
    choosePayment,
    completeCreditPayment
}