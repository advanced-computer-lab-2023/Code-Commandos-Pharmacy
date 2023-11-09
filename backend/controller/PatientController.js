const PatientModel = require('../model/Patient')
const WalletModel = require('../model/Wallet');
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const bodyParser = require('body-parser');


// get all patients
const getPatients = asyncHandler(async (req, res) => {
  try {
    const Patients = await PatientModel.find({}).sort({createdAt: -1})
    res.status(200).json(Patients)
  }
  catch (error){
    res.status(400)
    throw new Error(error.message)
  }
  
})

// get a single patient
const getPatient = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Patient not found')
  }
  try{
    const patient = await PatientModel.findById(id)
    if (!patient) {
      res.status(400)
      throw new Error('Patient not found')
    }
    res.status(200).json(patient)
  } catch (error){
    res.status(400)
    throw new Error(error.message)
  }

})

// create a new patient
const createPatient = asyncHandler(async (req, res) => {
  const patientBody = req.body
  try {
    const patient = await PatientModel.create(patientBody)
    res.status(200).json(patient)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
})

// delete a patient
const deletePatient = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Patient not found')
  }
  try{
    const patient = await PatientModel.findOneAndDelete({_id: id})
    if(!patient) {
      res.status(400)
      throw new Error('Patient not found')
    }
    res.status(200).json(patient)
  } catch (error){
    res.status(400)
    throw new Error(error.message)
  }
})

// update a patient
const updatePatient = asyncHandler(async (req, res) => {
  const { id } = req.params
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Patient not found')
  }
  try{
    const patient = await PatientModel.findOneAndUpdate({_id: id}, {...req.body})
    if (!patient) {
      res.status(400)
      throw new Error('Patient not found')
    }
    res.status(200).json(patient)
  } catch (error){
    res.status(400)
    throw new Error(error.message)
  }
})

//add a new delivery address (or multiple addresses)
const addPatientAddresses = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const { addresses } = req.body;
  try {
    const patient = await PatientModel.findOneAndUpdate({name: name},
      { $push: { addresses: { $each: addresses } } },
      { new: true }
    );
    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
      return;
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
});

//choose a delivery address from the delivery addresses available
const viewAvailableAddresses = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: 'Invalid patient ID' });
    return;
  }
  try {
    const patient = await PatientModel.findById(id);
    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
      return;
    }
    const newaddresses = patient.addresses;
    res.status(200).json({ newaddresses });
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
});


/*//choose to pay with wallet, credit card (using Stripe) or cash on delivery
const paymentMethod = asyncHandler(async (req, res) => {
  const { paymentMethod, amount } = req.body; // Extract payment method and amount from request body
  const { username } = req.user; // Assuming you have the user object in the request after authentication

  try {
    if (paymentMethod === 'wallet') {
      const wallet = await WalletModel.findOne({ username });

      if (!wallet) {
        return res.status(400).json({ error: 'Wallet not found' });
      }

      // Check if there's enough balance in the wallet
      if (wallet.amount < amount) {
        return res.status(400).json({ error: 'Insufficient funds in the wallet' });
      }

      // Decrement the amount from the wallet
      wallet.amount -= amount;
      await wallet.save();

      return res.status(200).json({ success: true, message: 'Wallet payment processed successfully' });
    } else if (paymentMethod === 'credit_card') {
      // Payment processing logic for credit card using Stripe
      const intent = await stripe.paymentIntents.create({
        amount: amount * 100, // Amount in cents
        currency: 'EGP',
      });

      // Return the client secret to confirm the payment on the client-side
      return res.status(200).json({ clientSecret: intent.client_secret });
    } else if (paymentMethod === 'cash_on_delivery') {
      return res.status(200).json({ success: true, message: 'Cash on delivery payment processed successfully' });
    } else {
      return res.status(400).json({ error: 'Invalid payment method' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Payment failed' });
  }
});

module.exports = {
  paymentMethod
};






//const { token, error } = await stripe.createToken(cardElement);
const payWithCreditCard = asyncHandler(async (req, res) => {
  const { amount, currency, token } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      payment_method: token,
      confirm: false,
    });

    const confirmedIntent = await stripe.paymentIntents.confirm(paymentIntent.id);

    if (confirmedIntent.status === 'succeeded') {
      // Payment succeeded
      res.status(200).json({ success: true });
    } else {
      // Payment failed
      console.error('Payment confirmation failed');
      res.status(500).json({ error: 'Payment failed' });
    }} catch (error) {
      // Payment failed
      console.error(error.message);
      res.status(500).json({ error: 'Payment failed' });
    }
  });*/
  //choose to pay with wallet, or credit card (using Stripe)
const payForOrder = asyncHandler(async (req, res) => {
  const { id } = req.user
  const { orderId, paymentMethod } = req.params; // Extract payment method and amount from request body
  try {
    const patient = await PatientModel.findById(id)
    //const healthPackage = await HealthPackageModel.findOne({_id:packageID})
    const order = await OrderModel.findOne({_id:orderID})
    if(!order){
      throw new Error("invalid order")
    }
    //const amount = await healthPackage.yearlySubscription
    if (paymentMethod === 'wallet') {
      if(patient.wallet < amount){
        res.status(400)
        throw new Error("Wallet balance insufficient.")
      } else {
        const newWallet = patient.wallet - amount;
        PatientModel.findOneAndUpdate({_id:id},{wallet:newWallet})
       
        
        res.status(200).json({ success: true, message: 'Wallet payment processed successfully.' });
      }
    }
    else if (paymentMethod === 'credit_card') {
      const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        line_items: [
          {
            price_data: {
              product_data:{
                //name: healthPackage.packageName + ' Health Package',
                id: order.id + ' Order',
              },
              unit_amount: amount*100,
              currency: 'egp',
            },
            quantity: 1,
          },
        ],
        mode: 'payment', //change to 'payment' if not a subscription
        
        success_url: `http://localhost:3000/HealthPackages/Subscribe/success?sessionID={CHECKOUT_SESSION_ID}`,
        cancel_url: 'http://localhost:3000/HealthPackages/Subscribe/cancel',
        metadata: {
          'patientID': req.user.id.toString(),
          'orderID': packageID.toString()
        }
      });
      res.status(200).json(session)
    }
    else {
      return res.status(400).json({ error: 'Invalid payment method' });
 }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const updateOrder = asyncHandler(async (req, res) => {
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
   
      const order = await OrderModel.findOneAndUpdate({_id:orderID},{status:Paid})
      res.status(200).json(order)
    
  }
  catch (error) {
    res.status(400).json(error.message)
  }
})
  
 



  
  




module.exports = {
    getPatients,
    getPatient,
    createPatient,
    deletePatient,
    updatePatient,
    addPatientAddresses,
    viewAvailableAddresses,
    payForOrder,
  
}