const express= require('express')
const router= express.Router()

const {
    addPharmacistRequest,
    viewUploadByPharmacist,
    viewAllPharmacistRequests
} = require('../controller/PharmacistRequestController')

router.post('/addPharmacistRequest', addPharmacistRequest)
router.get('/viewUploadByPharmacist/:id',viewUploadByPharmacist)
router.get('/viewAllPharmacistRequests',viewAllPharmacistRequests)

module.exports = router