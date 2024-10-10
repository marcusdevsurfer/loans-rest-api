const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();
const { getPaymentsByLoanId, addPayment } = require('./src/service/paymentService.js')

const db = new sqlite3.Database('loansdb.sqlite');
const app = express()
const PORT = process.env.PORT || 3000;

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS payments(date TEXT, amount INT, loanId INT)');
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/loans/:id/payments", (req, res) => {
    res.send(getPaymentsByLoanId(req.params.id))
})
app.post("/api/payments", (req, res) => {
    const date = req.body.date
    const amount = req.body.amount
    const loanId = req.body.loanId
    addPayment(res, date, amount, loanId)
})

app.listen(PORT, () => {
    console.log(`Server started`)
    console.log(`Server Listening on PORT:", ${PORT}`);
});


