const express= require('express')

const router = express.Router()
const {
    viewPharmacist,
    removePharmacist,
    addPharmacist,
    viewAllPharmacists
}= require('../controller/pharmacistController')

//Task 22: Get a Pharmacist's Info
router.get('/viewPharmacist/:id', viewPharmacist)
router.delete('/removePharmacist/:id', removePharmacist)
router.post('/addPharmacist', addPharmacist)
router.get('/viewAllPharmacists',viewAllPharmacists)
module.exports = router