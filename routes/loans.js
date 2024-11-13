import express from 'express'
import Loan from '../models/Loan.js'

const router = express.Router()

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

// // Obtener todos los payments by loanId
// router.get('/:loanId', async (req, res) => {
//     try {
//         const { loanId } = req.params
//         const payments = await Payment.find({loanId: loanId})
//         res.status(200).json(payments)
//     } catch {
//         (e) => {
//             res.status(500).json({ message: e.message })
//         }
//     }
// })

export default router