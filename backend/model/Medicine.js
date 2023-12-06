const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MedicineSchema = new Schema({
        name: {
            type: String,
            unique: true,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        details: {
            type: String
        },
        activeIngredient: {
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
        // Antipyretic: Fever reducer
        // Antiemetic: Prevents nausea and vomiting
        // Sedative : Promotes relaxation and sleep
        medicinalUse: {
            type: String,
            required: true,
            enum: ['PAIN-RELIEF',
                'ANTI-INFLAMMATORY',
                'ANTIPYRETIC',
                'ANTIDEPRESSANT',
                'ANTIDIABETIC',
                'ANTIEMETIC',
                'MUSCLE RELAXANT',
                'SEDATIVE',
                'VITAMIN'
            ]
        },
        imageUploadID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'File',
            required: true,
        },
        isArchived: {
            type: Boolean,
            default: false
        },
        customerReviews: {
            type: String,
        },
        customerRatings: {
            type: Number
        },
        sales: {
            type: Number
        }
    },
    {timestamps: true}
)

const Medicine = mongoose.model('Medicine', MedicineSchema)
module.exports = Medicine