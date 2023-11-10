const express = require('express');
const {upload} = require('../middleware/uploadHandler')
const  {singleFileUpload,getallSingleFiles} = require('../controller/FileController')
const {protect} = require('../middleware/AuthenticationHandler')
const {checkPharmacistRole} = require('../middleware/AccessHandler');
const router = express.Router();


router.post('/addSingleFile',protect,checkPharmacistRole, upload.single('file'), singleFileUpload);
router.get('/getSingleFiles', getallSingleFiles);


module.exports = {
  routes: router
}
