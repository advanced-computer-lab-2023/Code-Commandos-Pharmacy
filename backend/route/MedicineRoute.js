const express = require('express')

const {
    addOrUpdateMedicine,
    viewAvailableMedicines,
    searchMedicineByName,
    updateDetailsAndPrice,
    viewQuantityAndSales,
    filterMedicines,
    deleteMedicine
} = require('../controller/MedicineController')
const router = express.Router()


// Add a new medicine
router.post('/addMedicine', addOrUpdateMedicine)

// View a list of all available medicines (including Picture of Medicine, Price, Description)
router.get('/viewAvailableMedicines', viewAvailableMedicines)

// View the Available quantity, and Sales of each medicine
router.get('/viewQuantityAndSales', viewQuantityAndSales)

// Search for Medicine based on name
router.get('/searchMedicineByName/:name', searchMedicineByName)

// Edit medicine Details and Price
router.put('/updateDetailsAndPrice/:name', updateDetailsAndPrice)

// Filter medicines based on Medicinal Use
router.get('/filterMedicines/:medicinalUse', filterMedicines)

//Delete Medicine
router.delete('/delete/:name' , deleteMedicine )

module.exports = router