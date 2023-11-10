const express = require('express');
const uploadController = require('../controller/UploadRequestController');

const router = express.Router();

router.post('/api/upload', uploadController.handleUpload, uploadController.handleFileDetails);

module.exports = router;