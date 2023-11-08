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
  paymentMethod
} = require('../controller/PatientController')


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
router.post('/addPatientAddresses/:name', addPatientAddresses);

//view addresses
router.get('/viewAvailableAddresses/:id',  viewAvailableAddresses);

router.post('/paymentMethod', paymentMethod);

module.exports = router