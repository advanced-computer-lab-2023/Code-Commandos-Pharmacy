const express = require('express')
const {
  getPatients, 
  getPatient, 
  createPatient, 
  deletePatient, 
  updatePatient
} = require('../controller/PharmacyPatientController')

const router = express.Router()

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

module.exports = router