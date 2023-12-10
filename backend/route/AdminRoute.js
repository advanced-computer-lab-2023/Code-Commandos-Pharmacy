const express= require('express')
const router = express.Router()

const {
    addAdmin,
} = require('../controller/AdminController')
const {checkAdminRole} = require("../middleware/AccessHandler");
const {protect} = require("../middleware/AuthenticationHandler");


router.post('/addAdmin',protect,checkAdminRole,addAdmin)

module.exports = router