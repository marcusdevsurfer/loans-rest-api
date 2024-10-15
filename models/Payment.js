import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    date: { type: String, required: true },
    amount: { type: Number, required: true },
    loanId: { type: Number, required: true },
}, { timestamps: true })

export default mongoose.model('Payment', PaymentSchema) 