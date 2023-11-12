const express = require('express')

const {
    placeOrder, viewOrderDetails, cancelOrder,
    // setCreditPayment
} = require('../controller/OrderController')

const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientRole} = require("../middleware/AccessHandler");
const router = express.Router()

// Checkout
router.post('/placeOrder', protect, checkPatientRole, placeOrder)

// Get order details
router.get('/getOrders', protect, checkPatientRole, viewOrderDetails)

// Cancel Order
router.put('/cancelOrder/:id', protect, checkPatientRole, cancelOrder)


module.exports = router