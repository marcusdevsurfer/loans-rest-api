import express from 'express';
const app = express()
const PORT = process.env.PORT || 3000;
import { getPaymentsByLoanId } from './data/data.js';

app.get('/api/users/:id/payments', function (req, res) {
    res.send(getPaymentsByLoanId(req.params.id))
})

app.listen(PORT, () => {
    console.log(`Server started`)
    console.log(`Server Listening on PORT:", ${PORT}`);
});


