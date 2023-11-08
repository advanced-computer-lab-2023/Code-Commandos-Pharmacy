const PatientModel = require('../model/Patient')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const express = require('express');
const stripe = require('stripe')('your_stripe_secret_key');
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

    // Check if the patient exists
    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
      return;
    }

    // Send the updated patient data in the response
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
    // Find the patient by ID and retrieve their addresses
    const patient = await PatientModel.findById(id);
    // Check if the patient exists
    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
      return;
    }
 // Extract and send the addresses in the response
    const newaddresses = patient.addresses;
    res.status(200).json({ newaddresses });
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
});


//choose to pay with wallet, credit card (using Stripe) or cash on delivery
const paymentMethod = asyncHandler(async (req, res) => {
  const { paymentMethod, amount } = req.body; // Extract payment method and amount from request body
  try {
    let intent;
    // Handle payment based on the chosen method
    if (paymentMethod === 'wallet') {
        wallet=wallet-amount;
      res.status(200).json({ success: true, message: 'Wallet payment processed successfully' });
    }
     else if (paymentMethod === 'credit_card') {
      // Implement credit card payment logic using Stripe API
      intent = await stripe.paymentIntents.create({
        amount: amount * 100, // Amount in cents
        currency: 'EGP',
      });
    } 
    else if (paymentMethod === 'cash_on_delivery') {
      // Implement cash on delivery payment logic
      // For demonstration purposes, returning a success message
      res.status(200).json({ success: true, message: 'Cash on delivery payment processed successfully' });
    } 
    else {
      return res.status(400).json({ error: 'Invalid payment method' });
    }

    // Return the client secret to confirm the payment on the client-side
    if (intent) {
      res.status(200).json({ clientSecret: intent.client_secret });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Payment failed' });
  }
});

const payWithCreditCard = asyncHandler(async (req, res) => {
  const { amount, currency, token } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      payment_method: token,
      confirm: true,
    });

    // Payment succeeded
    res.status(200).json({ success: true });
  } catch (error) {
    // Payment failed
    console.error(error.message);
    res.status(500).json({ error: 'Payment failed' });
  }
});



  
  




module.exports = {
    getPatients,
    getPatient,
    createPatient,
    deletePatient,
    updatePatient,
    addPatientAddresses,
    viewAvailableAddresses,
    paymentMethod,
    payWithCreditCard 
}