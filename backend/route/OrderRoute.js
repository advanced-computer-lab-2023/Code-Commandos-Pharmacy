const express = require('express')
const multer = require('multer')

const {
    viewMyOrders,
    addOrder,
    deleteOrder,
    cardPayment,
    cashPayment,
    confirmOrder,
    displayConfirmedOrders,
    viewOrderDetails,
    setTotalPrice,
    cancelOrder,
    payForOrder,
    choosePayment,
    completeCreditPayment
} = require('../controller/OrderController')
const {
    checkPatientRole,
    checkDoctorRole,
    checkAdminRole
  } = require('../middleware/AccessHandler')
  
  const {protect} = require('../middleware/AuthenticationHandler')

const router = express.Router()

// View My Medicines
router.get('/viewMyOrders', viewMyOrders)

// Add Order
router.post('/addOrder', addOrder)

// Delete Order
router.delete('/deleteOrder/:id', deleteOrder)

// Set Credit Payment by id
router.put('/setCreditPayment', cardPayment)

// Set Cash Payment by id
router.put('/setCashPayment', cashPayment)

// Confirm order
router.put('/confirmOrder/:orderID/:paymentOption/:address', confirmOrder)

// Display Confirmed Orders
router.get('/displayConfirmedOrders', displayConfirmedOrders)

// View Order Details
router.get('/getOrderDetails', viewOrderDetails)

// Set Total Price
router.put('setTotalPrice/:subtotal', setTotalPrice)

// Delete Order by Id
router.delete('/cancelOrder/:id', cancelOrder)

//choose payment
router.get('/payForOrder/:orderID/:paymentOption', protect, checkPatientRole, payForOrder)

router.post('/choosePayment/:sessionID', protect, checkPatientRole,choosePayment)

router.get('/completeCreditPayment/:sessionID', completeCreditPayment)

module.exports = router

