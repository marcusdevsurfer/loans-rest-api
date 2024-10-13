import express from 'express'
import Payment from '../models/Payment.js'

const router = express.Router()


// Crear un nuevo item
router.post('/', async (req, res) => {
    const { amount } = req.body;
    try {
        const newPayment = new Payment({ amount });
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
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router