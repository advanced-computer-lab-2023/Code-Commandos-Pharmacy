const express = require('express')
const router = express.Router()
const {
  getPatients, 
  getPatient, 
  createPatient, 
  deletePatient, 
  updatePatient,
  addPatientAddresses,
  viewAvailableAddresses,
  paymentMethod,
  payWithCreditCard 
} =require('../controller/PatientController')


// GET all patients
router.get('/getPatients', getPatients)

// GET a single patient
router.get('/getPatient/:id', getPatient)

// create or POST a new patient
router.post('/createPatient', createPatient)

// patient registration route

// DELETE a patient
router.delete('/deletePatient/:id', deletePatient)

// update or PATCH a patient
router.patch('/updatePatient/:id', updatePatient)

// add patient adress
router.put('/addPatientAddresses/:name', addPatientAddresses);

//view addresses
router.get('/viewAvailableAddresses/:id',  viewAvailableAddresses);

//choose payment method
router.post('/paymentMethod', paymentMethod);
router.post('/payWithCreditCard ', payWithCreditCard );

module.exports = router