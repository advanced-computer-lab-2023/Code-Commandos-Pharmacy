const express = require('express');
const {upload} = require('../middleware/uploadHandler')
const  {singleFileUpload,getallSingleFiles} = require('../controller/FileController')
const router = express.Router();


router.post('/addSingleFile', upload.single('file'), singleFileUpload);
router.get('/getSingleFiles', getallSingleFiles);


module.exports = {
  routes: router
}
