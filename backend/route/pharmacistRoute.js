const express= require('express')
const router = express.Router()
const {protect} = require('../middleware/AuthenticationHandler')
const {checkAdminRole} = require('../middleware/AccessHandler');
const {
    viewPharmacist,
    removePharmacist,
    addPharmacist,
    viewAllPharmacists
}= require('../controller/pharmacistController')

//Task 22: Get a Pharmacist's Info
router.get('/viewPharmacist/:id',protect,checkAdminRole, viewPharmacist)
router.delete('/removePharmacist/:id',protect,checkAdminRole ,removePharmacist)
router.post('/addPharmacist', addPharmacist)
router.get('/viewAllPharmacists',protect,checkAdminRole,viewAllPharmacists)
module.exports = router