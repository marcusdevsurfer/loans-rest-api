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

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const payment = await Payment.findById(id)
        res.status(200).json(payment)
    } catch {
        (e) => {
            res.status(500).json({ message: e.message })
        }
    }
})

export default router