const asyncHandler = require('express-async-handler')
const Order = require('../model/Order')
const Cart = require('../model/Cart')
const mongoose = require('mongoose')
const Medicine = require("../model/Medicine");
const PatientModel = require("../model/Patient")
const OrderModel = require("../model/Order")
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const SalesReport = require("../model/SalesReport")
const Pharmacist = require('../model/Pharmacist')
const nodemailer = require("nodemailer");

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
const cancelOrder = asyncHandler(async (req,res)=> {
    try{
        const {id} = req.params
        const patientId = req.user.id
        const order = await Order.findOne({patientId:patientId, _id: id})
        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        }
        // Update the Sales in SalesReport
        const orderMonth = order.orderID.toLocaleString('default', { month: 'long' }); //November
        const salesDocument = await SalesReport.findOne();
        const salesEntry = salesDocument.salesMonth.find(entry => entry.month === orderMonth);

        salesEntry.sales -= order.totalNumberOfItems;
        await salesDocument.save();

        // Update the cancelled Medicines array in the SalesReport
        const salesReport = await SalesReport.findOne();
        order.medicines.forEach((medicine) => {
            const cancelledMedicines = {
                medicineName: medicine.name,
                amount: medicine.amount,
                orderDate: new Date(),
            };
            salesReport.cancelledMedicines.push(cancelledMedicines); // Add the medicinePurchase object to the existing array
        });
        await salesReport.save();

        // Update the Medicine's quantity
        for(const medicine of order.medicines){
            const {name , amount} = medicine;
            const foundMedicine = await Medicine.findOne({name});
            if(foundMedicine){
                const newQuantity = foundMedicine.quantity + amount;
                foundMedicine.quantity = newQuantity;
                await foundMedicine.save();
            }
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
              paymentOption: 'Wallet',
              totalPrice: cart.subtotal + cart.shipping,
          })
            // Schedule the shipment
            scheduleStatusUpdate(newOrder.orderId);

            // Retrieve the current month, loop over the cart.medicines, add their amounts in a variable
            const currentMonth = new Date().toLocaleString('default', { month: 'long' });
            let totalAmount = 0;
            for (const item of cart.medicines) {
                totalAmount += item.amount;
            }
            // Update or create the sales document
            let salesDocument = await SalesReport.findOne();
            if (!salesDocument) {
                salesDocument = new SalesReport();
            }
            const salesEntry = salesDocument.salesMonth.find(entry => entry.month === currentMonth);
            if (salesEntry) {
                salesEntry.sales += totalAmount;
            } else {
                salesDocument.salesMonth.push({ month: currentMonth, sales: totalAmount });
            }
            await salesDocument.save();
            console.log('Sales document updated or created successfully.');

            const salesReport = await SalesReport.findOne();

            // Loop through the medicines array and save the medicine's name, amount, and order date
            cart.medicines.forEach((medicine) => {
                const medicinePurchase = {
                    medicineName: medicine.name,
                    amount: medicine.amount,
                    orderDate: new Date(),
                };
                salesReport.medicinePurchase.push(medicinePurchase); // Add the medicinePurchase object to the existing array
            });

            await salesReport.save();
            // Empty the cart and create the order
            for(const medicine of cart.medicines){
                const {name , amount} = medicine;
                const foundMedicine = await Medicine.findOne({name});
                if(foundMedicine){
                    const newQuantity = foundMedicine.quantity - amount;
                    foundMedicine.quantity = newQuantity;
                    await foundMedicine.save();
                    if(foundMedicine.quantity <= 0)
                        sendMailToPharmacists(foundMedicine.name);
                }
            }
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
          for(const medicine of cart.medicines){
              const {name , amount} = medicine;
              const foundMedicine = await Medicine.findOne({name});
              if(foundMedicine){
                  const newQuantity = foundMedicine.quantity - amount;
                  foundMedicine.quantity = newQuantity;
                  await foundMedicine.save();
                  if(foundMedicine.quantity <= 0)
                      sendMailToPharmacists(foundMedicine.name);
              }
          }
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

          // Retrieve the current month, loop over the cart.medicines, add their amounts in a variable
          const currentMonth = new Date().toLocaleString('default', { month: 'long' });
          let totalAmount = 0;
          for (const item of cart.medicines) {
              totalAmount += item.amount;
          }
          // Update or create the sales document
          let salesDocument = await SalesReport.findOne();
          if (!salesDocument) {
              salesDocument = new SalesReport();
          }
          const salesEntry = salesDocument.salesMonth.find(entry => entry.month === currentMonth);
          if (salesEntry) {
              salesEntry.sales += totalAmount;
          } else {
              salesDocument.salesMonth.push({ month: currentMonth, sales: totalAmount });
          }
          await salesDocument.save();
          console.log('Sales document updated or created successfully.');
          for(const medicine of cart.medicines){
              const {name , amount} = medicine;
              const foundMedicine = await Medicine.findOne({name});
              if(foundMedicine){
                  const newQuantity = foundMedicine.quantity - amount;
                  foundMedicine.quantity = newQuantity;
                  await foundMedicine.save();
                  if(foundMedicine.quantity <= 0)
                      sendMailToPharmacists(foundMedicine.name);
              }
          }
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

        // Retrieve the current month, loop over the cart.medicines, add their amounts in a variable
        const currentMonth = new Date().toLocaleString('default', { month: 'long' });
        let totalAmount = 0;
        for (const item of cart.medicines) {
            totalAmount += item.amount;
        }
        // Update or create the sales document
        let salesDocument = await SalesReport.findOne();
        if (!salesDocument) {
            salesDocument = new SalesReport();
        }
        const salesEntry = salesDocument.salesMonth.find(entry => entry.month === currentMonth);
        if (salesEntry) {
            salesEntry.sales += totalAmount;
        } else {
            salesDocument.salesMonth.push({ month: currentMonth, sales: totalAmount });
        }
        await salesDocument.save();
        console.log('Sales document updated or created successfully.');

        await Cart.findOneAndUpdate({_id:cart._id},{medicines:[],totalNumberOfItems:0,subtotal:0})
        res.status(200).json(newOrder)
    } else {
        res.status(400)
        throw new Error('Payment unsuccessful')
    }
})

const updateOrderStatus = async (orderId, newStatus) => {
    try {
        const order = await Order.findOneAndUpdate({ orderId }, { status: newStatus }, { new: true });
        console.log(`Order ${orderId} status updated to ${newStatus}`);
    } catch (error) {
        console.error(`Error updating order ${orderId} status: ${error}`);
    }
};

const scheduleStatusUpdate = (orderId) => {
    setTimeout(async () => {
        try{
            const order = Order.findOne({orderId, status:'PENDING'});
            if (order){
                await updateOrderStatus(orderId, 'ONITSWAY');
                scheduleDeliveryStatusUpdate(orderId);
            }

        }
        catch (error) {
            console.error('Error updating order status:', error);
        }
    }, 3 * 60 * 1000); // 3 minutes
}

const scheduleDeliveryStatusUpdate = (orderId) => {
    setTimeout(async () => {
        try {
            await updateOrderStatus(orderId, 'DELIVERED');
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    }, 5 * 60 * 1000); // 5 minutes
};

const sendEmail =  asyncHandler(async (email,content) => {
    let nodeConfig = {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.APP_PASSWORD,

        }
    }
    let transporter = nodemailer.createTransport(nodeConfig);
    let message = {
        from : {
            name: "Code Commandos",
            address: process.env.ETHEREAL_EMAIL
        },
        to: email,
        subject : "Medicine out of stock",
        text: content,
    }
    try {
        const response = await transporter.sendMail(message)
    }
    catch (error){
        throw new Error(error.message)
    }
})

const sendMailToPharmacists = asyncHandler(async (name) => {
    try {
        const pharmacists = await Pharmacist.find();
        for (const ph of pharmacists){
            sendEmail(ph.email,`Kindly note that medicine ${name} is out of stock now`)
        }
    }
    catch (error){
        throw new Error(error.message)
    }
})

module.exports = {
    viewOrderDetails,
    cancelOrder,
    payForOrder,
    completeCreditPayment,
}