import express from 'express'
import Payment from '../models/Payment.js'

const router = express.Router()

router.post('/save', async (req, res) => {
    try {
        const newPayment = await Payment.create(req.body);
        await newPayment.save();
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:loan', async (req, res) => {
    try {
        const { loan } = req.params
        const payments = await Payment.find({ loan: loan })
        res.status(200).json(payments)
    } catch {
        (e) => {
            res.status(500).json({ message: e.message })
        }
    }
})

export default router