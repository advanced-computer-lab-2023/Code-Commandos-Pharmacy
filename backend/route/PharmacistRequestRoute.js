const express= require('express')
const router= express.Router()

const {protect} = require('../middleware/AuthenticationHandler')
const {checkAdminRole} = require('../middleware/AccessHandler');
const {
    addPharmacistRequest,
    viewUploadByPharmacist,
    viewAllPharmacistRequests,
    updatePharmacistRequestStatus, acceptRequest, rejectRequest,
} = require('../controller/PharmacistRequestController')


router.post('/addPharmacistRequest', addPharmacistRequest)
router.get('/viewAllPharmacistRequests',protect,checkAdminRole,viewAllPharmacistRequests)
router.post('/acceptRequest/:id',protect,checkAdminRole,acceptRequest)
router.delete('/rejectRequest/:id',protect,checkAdminRole,rejectRequest)

module.exports = router