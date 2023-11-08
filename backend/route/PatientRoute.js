const express = require('express')
const router = express.Router()

const {
  getPatients, 
  getPatient, 
  createPatient, 
  deletePatient, 
  updatePatient
} = require('../controller/PatientController')

const {
  checkPatientRole,
  checkDoctorRole,
  checkAdminRole
} = require('../middleware/AccessHandler')

const {protect} = require('../middleware/AuthenticationHandler')

router.get('/getPatients',protect,checkAdminRole, getPatients)

router.get('/getPatient/:id', getPatient)

router.post('/createPatient', createPatient)

router.delete('/deletePatient/:id', deletePatient)

router.patch('/updatePatient/:id', updatePatient)

module.exports = router