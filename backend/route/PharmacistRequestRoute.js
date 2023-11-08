const express= require('express')
const router= express.Router()

const {
    addPharmacistRequest,
    viewUploadByPharmacist,
    viewAllPharmacistRequests,
    updatePharmacistRequestStatus
} = require('../controller/PharmacistRequestController')

router.post('/addPharmacistRequest', addPharmacistRequest)
router.get('/viewUploadByPharmacist/:id',viewUploadByPharmacist)
router.get('/viewAllPharmacistRequests',viewAllPharmacistRequests)
router.post('/updatePharmacistRequestStatus',updatePharmacistRequestStatus)


module.exports = router