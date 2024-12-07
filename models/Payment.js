import mongoose, { Schema, model } from "mongoose";

const PaymentSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true
    },
    loan: {
        type: Schema.Types.ObjectId,
        ref: 'Loan',
        required: true
    },
});

export default model('Payment', PaymentSchema) 