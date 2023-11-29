const mongoose = require('mongoose')
const Schema = mongoose.Schema

const monthEnum = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const SalesSchema = new Schema({
    salesMonth: {
        type: [
            {
                month: {
                    type: String,
                    enum: monthEnum,
                },
                sales: {
                    type: Number,
                    default: 0,
                },
            },
        ],
        default: monthEnum.map((month) => ({ month })),
    },
    medicinePurchase: {
        type: [
            {
                medicineName: {
                    type: String,
                },
                amount: {
                    type: Number,
                },
                orderDate: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        default: [],
    },
    cancelledMedicines: {
        type: [
            {
                medicineName: {
                    type: String,
                },
                amount: {
                    type: Number,
                },
                orderDate: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        default: [],
    }
})

const SalesReport = mongoose.model('SalesReport', SalesSchema)


module.exports = SalesReport