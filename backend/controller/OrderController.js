const asyncHandler = require('express-async-handler')
const Order = require('../model/Order')
const Cart = require('../model/Cart')
const mongoose = require('mongoose')
const Medicine = require("../model/Medicine");
const PatientModel = require("../model/Patient")
const OrderModel = require("../model/Order")
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// Place My Order :  Confirm Order
const placeOrder = asyncHandler(async (req, res) => {
    try {
        const patientId = req.user.id
        const cart = await Cart.findOne({patientId})
        if (!cart) {
            return res.status(404).json({message: 'Cart is empty'});
        }
        const order = new Order({
            patientId: patientId,
            cartId: cart._id,
            subtotal: cart.subtotal,
            shipping: cart.shipping,
            totalPrice: cart.subtotal + cart.shipping,
            totalNumberOfItems: cart.totalNumberOfItems,
        })
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})
// View Order Details
const viewOrderDetails = asyncHandler(async (req, res) => {
    try {
        const patientId = req.user.id;
        const orders = await Order.find({patientId});
        const orderDetails = orders.map((order) => {
            return {
                orderId: order._id,
                totalNumberOfItems: order.totalNumberOfItems,
                totalPrice: order.totalPrice,
                paymentOption: order.paymentOption,
                status: order.status,
            };
        });
        res.status(200).json(orderDetails);
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

// Delete Order by Id
const cancelOrder = asyncHandler(async (req,res)=>{
    try{
        const {id} = req.params
        const patientId = req.user.id
        const order = await Order.findOne({patientId:patientId, _id: id})
        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        }
        await order.deleteOne({id})
        res.json({message: 'Order cancelled successfully'});
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});


const payForOrder = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const { cartId, paymentOption } = req.params; // Extract payment method and amount from request body
    try {
      const patient = await PatientModel.findById(id)
      //const healthPackage = await HealthPackageModel.findOne({_id:packageID})
      const cart = await Cart.findOne({_id:cartId})
      const amount = cart.subtotal + 50
      if(!cart){
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
          const newOrder = await OrderModel.create({
              patientId: cart.patientId,
              cartId: cart._id,
              subtotal: cart.subtotal,
              shipping: cart.shipping,
              totalNumberOfItems: cart.totalNumberOfItems,
              paymentOption: 'Wallet', // Set the payment option as needed
              totalPrice: cart.subtotal + cart.shipping,
          })
            await Cart.findOneAndUpdate({_id:cart._id},{medicines:[],totalNumberOfItems:0,subtotal:0})
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
                  name: 'Pharmacy order',
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
            'cartID': cartId.toString()
          }
        });
        res.status(200).json(session)
      }
      else if (paymentOption === 'CashOnDelivery') {
          const newOrder = await OrderModel.create({
              patientId: cart.patientId,
              cartId: cart._id,
              subtotal: cart.subtotal,
              shipping: cart.shipping,
              totalNumberOfItems: cart.totalNumberOfItems,
              paymentOption: 'CashOnDelivery', // Set the payment option as needed
              totalPrice: cart.subtotal + cart.shipping,
          })
          await Cart.findOneAndUpdate({_id:cart._id},{medicines:[],totalNumberOfItems:0,subtotal:0})
          res.status(200).json(newOrder);
        
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
    const oldOrder = await OrderModel.findOne({sessionID})
    if(oldOrder){
        return
    }
    if(session.payment_status==="paid"){
        const cartID = session.metadata.cartID
        const cart = await Cart.findOne({_id:cartID})
        const newOrder = await OrderModel.create({
            patientId: cart.patientId,
            cartId: cart._id,
            subtotal: cart.subtotal,
            shipping: cart.shipping,
            totalNumberOfItems: cart.totalNumberOfItems,
            paymentOption: 'CreditCard', // Set the payment option as needed
            totalPrice: cart.subtotal + cart.shipping,
            sessionID:sessionID
        })
        await Cart.findOneAndUpdate({_id:cart._id},{medicines:[],totalNumberOfItems:0,subtotal:0})
        res.status(200).json(newOrder)
    } else {
        res.status(400)
        throw new Error('Payment unsuccessful')
    }
})

module.exports = {
    placeOrder,
    viewOrderDetails,
    cancelOrder,
    payForOrder,
    completeCreditPayment,
}