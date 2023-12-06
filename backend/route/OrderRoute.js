const express = require('express')

const {
    placeOrder,
    viewOrderDetails,
    cancelOrder,
    payForOrder,
    completeCreditPayment
} = require('../controller/OrderController')

const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientRole} = require("../middleware/AccessHandler");
const router = express.Router()


// Get order details
router.get('/getOrders', protect, checkPatientRole, viewOrderDetails)

// Cancel Order
router.put('/cancelOrder/:id', protect, checkPatientRole, cancelOrder)

//choose payment
router.get('/payForOrder/:cartId/:paymentOption', protect, checkPatientRole, payForOrder)

router.get('/completeCreditPayment/:sessionID', completeCreditPayment)

module.exports = router