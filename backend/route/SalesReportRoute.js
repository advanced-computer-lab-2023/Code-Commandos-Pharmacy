const express = require('express')

const {
    viewSalesReportByMonth
} = require('../controller/SalesReportController')

const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientRole, checkPharmacistRole} = require("../middleware/AccessHandler");
const router = express.Router()

// View Sales Report By Month
router.get('/viewReportByMonth/:month', protect, checkPharmacistRole, viewSalesReportByMonth)

module.exports = router
