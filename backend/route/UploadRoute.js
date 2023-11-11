const express = require('express');
const uploadController = require('../controller/UploadRequestController');
const {protect} = require('../middleware/AuthenticationHandler')
const {checkPharmacistRole} = require('../middleware/AccessHandler');
const router = express.Router();

router.post('/uploadRequest',protect,checkPharmacistRole,uploadController.handleUpload, uploadController.handleFileDetails);

module.exports = router;