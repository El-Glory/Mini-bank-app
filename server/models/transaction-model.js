import mongoose from "mongoose";
const Float = require('mongoose-float').loadType(mongoose)

const transactionSchema = new mongoose.Schema({
    createdOn: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        enum: ["credit", "debit"]
    },
    accountNumber: {
        type: Number,
        required: true,
    },
    cashier:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    amount: {
        type: Float
    },
    oldBalance: {
        type: Float
    },
    newBalance:{
        type: Float
    }
})

module.exports = mongoose.model('Transaction', transactionSchema)