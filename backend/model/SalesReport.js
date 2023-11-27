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
    }
})

const SalesReport = mongoose.model('SalesReport', SalesSchema)


module.exports = SalesReport