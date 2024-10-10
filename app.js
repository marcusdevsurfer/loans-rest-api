const express = require('express');
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();
const { getPaymentsByLoanId } = require('./data/data.js');
const { getPayments, addPayment } = require('./src/service/paymentService.js')

const db = new sqlite3.Database('loansdb.sql');
const app = express()
const PORT = process.env.PORT || 3000;

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS payments(date TEXT, amount INT, loanId INT)');
})
db.close()
app.use(cors())

app.get("/api/loans/:id/payments", (req, res) => {
    res.send(getPaymentsByLoanId(req.params.id))
})

app.post("/api/payments", (req, res) => {
    res.send({ name: "Marcus" })
})

app.listen(PORT, () => {
    console.log(`Server started`)
    console.log(`Server Listening on PORT:", ${PORT}`);
});


