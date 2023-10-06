const express = require('express')

const {
    addOrUpdateMedicine,
    viewAvailableMedicines,
    viewMedicine,
    updateDetailsAndPrice,
    viewQuantityAndSales,
    filterMedicines
} = require('../controller/MedicineController')
const router = express.Router()


// Add a new medicine
router.post('/addMedicine', addOrUpdateMedicine)

// View a list of all available medicines (including Picture of Medicine, Price, Description)
router.get('/viewAvailableMedicines', viewAvailableMedicines)

// View the Available quantity, and Sales of each medicine
router.get('/viewQuantityAndSales/:name', viewQuantityAndSales)

// Search for Medicine based on name
router.get('/viewMedicine/:name', viewMedicine)

// Edit medicine Details and Price
router.patch('/updateDetailsAndPrice/:name', updateDetailsAndPrice)

// Filter medicines based on Medicinal Use
router.get('/filterMedicines/:medicinalUse', filterMedicines)

module.exports = router