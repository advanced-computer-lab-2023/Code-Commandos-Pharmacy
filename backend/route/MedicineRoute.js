const express = require('express')
const multer = require('multer')
const path = require('path');

// Multer Configurations
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./uploads')
},
    filename: (req,file,cb)=>{
        const filename = `${Date.now()}_${file.originalname}`
        cb(null,filename)
    }
})
const upload = multer({storage}).single('imageUploadID')



const {
    addOrUpdateMedicine,
    viewAvailableMedicines,
    searchMedicineByName,
    updateDetailsAndPrice,
    viewQuantityAndSales,
    filterMedicines,
    deleteMedicine,
    viewMedicineInCart,
    updateAmount,
    removeMedicineFromCart,
    getMedicineDetailsById
} = require('../controller/MedicineController')
const {protect} = require("../middleware/AuthenticationHandler");
const {checkPharmacistRole} = require("../middleware/AccessHandler");
const router = express.Router()


// Add a new medicine
router.post('/addMedicine',protect,checkPharmacistRole, upload, addOrUpdateMedicine)

// View a list of all available medicines (including Picture of Medicine, Price, Description)
router.get('/viewAvailableMedicines', viewAvailableMedicines)

// View the Available quantity, and Sales of each medicine
router.get('/viewQuantityAndSales', protect,checkPharmacistRole, viewQuantityAndSales)

// Search for Medicine based on name
router.get('/searchMedicineByName/:name',protect, searchMedicineByName)

// Edit medicine Details and Price
router.put('/updateDetailsAndPrice/:name', protect,checkPharmacistRole, updateDetailsAndPrice)

// Filter medicines based on Medicinal Use
router.get('/filterMedicines/:medicinalUse', protect, filterMedicines)

//Delete Medicine
router.delete('/delete/:name' , deleteMedicine )

module.exports = router