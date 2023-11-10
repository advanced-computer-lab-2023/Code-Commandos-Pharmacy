const express= require('express')
const router = express.Router()

const {viewAllPharmacists} =require('../controller/pharmacistController')

const {
    addAdmin,
} = require('../controller/AdminController')



router.post('/addAdmin',addAdmin)


module.exports = router