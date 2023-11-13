const express = require('express')

const {
    addToCart,
    viewCart,
    removeMedicine,
    updateAmountInCart
} = require('../controller/CartController')
const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientRole} = require("../middleware/AccessHandler");
const router = express.Router()

// Add medicine to the logged in patient
router.post('/addToCart/:name', protect, checkPatientRole, addToCart)

// View My Cart
router.get('/viewMyCart', protect, checkPatientRole, viewCart)

// Remove Medicine from Logged in patient's Cart
router.put('/removeMedicine/:name', protect, checkPatientRole, removeMedicine);

// Update Amount of Medicine in Cart
router.put('/updateAmount/:name/:newAmount', protect, checkPatientRole, updateAmountInCart)

module.exports = router