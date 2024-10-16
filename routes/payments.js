import express from 'express'
import Payment from '../models/Payment.js'

const router = express.Router()


// Crear un nuevo Payment
router.post('/save', async (req, res) => {
    try {
        const newPayment = await Payment.create(req.body);
        await newPayment.save();
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener todos los items
router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener todos los payments by loanId
router.get('/:loanId', async (req, res) => {
    try {
        const { loanId } = req.params
        const payments = await Payment.find({loanId: loanId})
        res.status(200).json(payments)
    } catch {
        (e) => {
            res.status(500).json({ message: e.message })
        }
    }
})

export default router