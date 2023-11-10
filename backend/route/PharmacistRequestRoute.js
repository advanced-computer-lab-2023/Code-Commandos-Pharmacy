const express= require('express')
const router= express.Router()
const {protect} = require('../middleware/AuthenticationHandler')
const {checkAdminRole} = require('../middleware/AccessHandler');
const {
    addPharmacistRequest,
    viewUploadByPharmacist,
    viewAllPharmacistRequests,
    updatePharmacistRequestStatus
} = require('../controller/PharmacistRequestController')

router.post('/addPharmacistRequest', addPharmacistRequest)
router.get('/viewUploadByPharmacist/:id',protect,checkAdminRole,viewUploadByPharmacist)
router.get('/viewAllPharmacistRequests',viewAllPharmacistRequests)
router.post('/updatePharmacistRequestStatus',protect,checkAdminRole,updatePharmacistRequestStatus)


module.exports = router