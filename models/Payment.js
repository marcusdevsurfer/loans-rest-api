import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    date: { type: String, required: true },
    amount: { type: String, required: true },
    loanId: { type: Number, required: true },
}, { timestamps: true })

export default mongoose.model('Payment', paymentSchema) 