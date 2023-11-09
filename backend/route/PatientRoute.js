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
} = require('../controller/PatientController')

const {
  checkPatientRole,
  checkDoctorRole,
  checkAdminRole
} = require('../middleware/AccessHandler')

const {protect} = require('../middleware/AuthenticationHandler')

router.get('/getPatients',protect,checkAdminRole, getPatients)

router.get('/getPatient/:id',protect,checkAdminRole, getPatient)

router.post('/createPatient',checkPatientRole, createPatient)

router.delete('/deletePatient/:id',protect,checkAdminRole, deletePatient)

router.patch('/updatePatient/:id',protect,checkAdminRole, updatePatient)

router.put('/addPatientAddresses/:name',protect,checkPatientRole, addPatientAddresses);

router.get('/viewAvailableAddresses/:id',protect,checkPatientRole, viewAvailableAddresses);

router.post('/paymentMethod',protect,checkAdminRole, paymentMethod);

router.post('/payWithCreditCard ',protect,checkPatientRole, payWithCreditCard );

module.exports = router