const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MedicineSchema = new Schema({
        name: {
            type: String,
            unique: true,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        details: {
            type: String
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        manufacturer: {
            type: String,
            required: true
        },
        ingredients: {
            type: String,
            required: true
        },
        sideEffects: {
            type: String,
            required: true
        },
        productionDate: {
            type: Date,
        },
        expiryDate: {
            type: Date,
            required: true
        },
        customerReviews: {
            type: String,
        },
        customerRatings: {
            type: Number
        }
    },
    {timestamps: true}
)

const Medicine = mongoose.model('Medicine', MedicineSchema)
module.exports = Medicine

