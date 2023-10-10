const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const PharmacistRequestModel = require("../model/PharmacistRequest");

//Task 7 view data uploaded by a pharmacist
const  viewUploadByPharmacist=asyncHandler( async(req, res)=>{
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404)
        throw new Error('Pharmacist not found')
    }
    try {
        const pharmacistRequest = await PharmacistRequestModel.findById(id).select('-password')
        if(!pharmacistRequest){
            res.status(404)
            throw new Error('Pharmacist Request not found')
        }
        res.status(200).json(pharmacistRequest)
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})

const addPharmacistRequest =asyncHandler( async(req,res) => {
    const requestBody=req.body;
    try{
        const pharmacist= await PharmacistRequestModel.create(requestBody);
        res.status(200).json(pharmacist)
    }catch(error){
        res.status(400)
        throw new Error(error.message)
    }
})

const viewAllPharmacistRequests = asyncHandler(async (req,res) => {
    try {
        const requests = await PharmacistRequestModel.find()
        res.status(200).json(requests)
    }
    catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports = {
    addPharmacistRequest,
    viewUploadByPharmacist,
    viewAllPharmacistRequests
}