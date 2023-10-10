const express= require('express')
const router = express.Router()

const {
    addAdmin
} = require('../controller/PharmacyAdminController')

router.post('/addAdmin',addAdmin)

module.exports = router