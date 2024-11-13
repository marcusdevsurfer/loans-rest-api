import express from 'express';
import Loan from '../models/Loan.js';

const router = express.Router();

// Create a new Loan
router.post('/save', async (req, res) => {
    try {
        const newLoan = await Loan.create(req.body);
        await newLoan.save();
        res.status(201).json(newLoan);
        console.info('POST /api/loans/save -- ' + res.statusCode);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all Loans
router.get('/', async (req, res) => {
    try {
        const loans = await Loan.find();
        res.status(200).json(loans);
        console.info('GET /api/loans -- ' + res.statusCode);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Loan by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const loan = await Loan.findOne({_id: id})
        res.status(200).json(loan);
    } catch(error) {
        res.status(404).json({ message: 'Loan not found' });
    }
})

export default router