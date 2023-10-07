const express= require('express')

const admin= express.Router()
const{viewPharmacist,removePharmacist,viewUploadByPharmacist,addPharmacist,addPharmacistReq}= require('../controller/pharmacistController')

//Task 22: Get a Pharmacist's Info
admin.get('/viewPharmacist/:id', viewPharmacist)
admin.delete('/deletePharmacist/:id', removePharmacist)
admin.get('/uploadByPharmacist/:id',viewUploadByPharmacist)
admin.post('/addPharmacist', addPharmacist)
admin.post('/addPharmacistReq', addPharmacistReq)

module.exports= admin