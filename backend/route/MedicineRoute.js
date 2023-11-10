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
const upload = multer({storage}).single('imageUpload')



const {
    addOrUpdateMedicine,
    viewAvailableMedicines,
    searchMedicineByName,
    updateDetailsAndPrice,
    viewQuantityAndSales,
    filterMedicines,
    deleteMedicine,
    setAddedToCart,
    viewMedicineInCart,
    updateAmount,
    removeMedicineFromCart
} = require('../controller/MedicineController')
const router = express.Router()


// Add a new medicine
router.post('/addMedicine', upload, addOrUpdateMedicine)

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

// Set addedToCart to true
router.put('/setAddedToCart/:name',setAddedToCart)

// View Medicines in Cart
router.get('/viewMedicineCart', viewMedicineInCart)

// Edit Medicine in Cart's Amount
router.put('/editAmount/:name', updateAmount)

// Remove Medicine from Cart
router.put('/removeMedicineFromCart/:name', removeMedicineFromCart)

// router.post('/uploads', upload, (req,res)=>{
//     const {file} = req
//     res.send({
//         file: file.originalname,
//         path: file.path
//     })
// })

module.exports = router