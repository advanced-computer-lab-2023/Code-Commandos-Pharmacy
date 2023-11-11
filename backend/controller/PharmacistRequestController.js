const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const PharmacistRequestModel = require("../model/PharmacistRequest");
const User = require("../model/User");
const Pharmacist = require("../model/Pharmacist");


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

// Task32 added Uploaded documents needed while adding pharmacist Request
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

const acceptRequest = asyncHandler(async (req, res) => {
    const {id} = req.params
    try {
        const request = await PharmacistRequestModel.findByIdAndDelete(id)
        const user = await User.create({username: request.username,password: request.password,role:'PHARMACIST'})
        const addPharmacist =await Pharmacist.create({username: request.username,name: request.name,email:  request.email,password: request.password,dateOfBirth:  request.dateOfBirth,hourlyRate: request.hourlyRate,affiliation: request.affiliation,educationalBackground: request.educationalBackground})
        res.status(200).json(addPharmacist)

    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})

const rejectRequest = asyncHandler(async (req, res) => {
    const {id}=req.params
    try {
        const request = await PharmacistRequestModel.findByIdAndRemove(id)
        res.status(200).json(request)
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports = {
    addPharmacistRequest,
    viewUploadByPharmacist,
    viewAllPharmacistRequests,
    acceptRequest,
    rejectRequest
}