const express= require('express')
const admin= express.Router()
const{viewPharmacist,removePharmacist,viewUploadByPharmacist}= require('../controller/pharmacistController')

//Task 22: Get a Pharmacist's Info
admin.get('/pharmacist/:id', viewPharmacist)
admin.delete('/pharmacist/:id', removePharmacist)
admin.get('/UploadByPharmacist',viewUploadByPharmacist)

module.exports= admin