const asyncHandler = require("express-async-handler");

const checkPatientRole = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === 'PATIENT') {
        next();
    } else {
        res.status(403)
        throw new Error('Access denied. You do not have the Patient role.')
    }
})

const checkPharmacistRole = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === 'PHARMACIST') {
        next();
    } else {
        res.status(403)
        throw new Error('Access denied. You do not have the Pharmacist role.')
    }
})

const checkAdminRole = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        res.status(403)
        throw new Error('Access denied. You do not have the Admin role.')
    }
})
const checkPharmacistOrAdminRole = asyncHandler(async (req, res, next) => {
    if ( (req.user && req.user.role === 'ADMIN') || (req.user && req.user.role === 'PHARMACIST')) {
        next();
    } else {
        res.status(403)
        throw new Error('Access denied. You do not have the Pharmacist or Admin role.')
    }
})



module.exports = {
    checkPatientRole,
    checkPharmacistRole,
    checkAdminRole,
    checkPharmacistOrAdminRole
}