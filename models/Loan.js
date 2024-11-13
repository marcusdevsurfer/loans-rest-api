import mongoose from "mongoose";
const { Schema, model } = mongoose;

const LoanSchema = new Schema({
    borrower: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    interestRate: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
});

export default model('Loan', LoanSchema);