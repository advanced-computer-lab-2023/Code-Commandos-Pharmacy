const express = require('express')

const {
    viewSalesReportByMonth,
    filterReportBasedOnName,
    filterReportBasedOnDate,
    viewAllReport
} = require('../controller/SalesReportController')

const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientRole, checkPharmacistRole, checkPharmacistOrAdminRole} = require("../middleware/AccessHandler");
const router = express.Router()

// View Sales Report By Month
router.get('/viewReportByMonth/:month', protect, checkPharmacistOrAdminRole, viewSalesReportByMonth)

// Filter Report based on Medicine Name
router.get('/filterReportBasedOnName/:name',protect,checkPharmacistRole,filterReportBasedOnName)

// Filter Report based on Date
router.get('/filterReportBasedOnDate/:start/:end',protect,checkPharmacistRole,filterReportBasedOnDate)

// View All
router.get('/viewAll', protect,checkPharmacistOrAdminRole, viewAllReport)

module.exports = router
