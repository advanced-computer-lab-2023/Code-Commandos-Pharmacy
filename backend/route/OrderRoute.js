const express = require('express')

const {
    placeOrder,
    checkoutOrder
}= require('../controller/OrderController')

const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientRole} = require("../middleware/AccessHandler");
const router = express.Router()

// Checkout
router.post('/checkoutOrder',protect,checkPatientRole, checkoutOrder)
module.exports = router