const express = require('express');
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();
const { getPaymentsByLoanId } = require('./data/data.js');

const db = new sqlite3.Database('loansdb.sql');
const app = express()
const PORT = process.env.PORT || 3000;

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS payments(date TEXT)');
})
db.close()

app.use(cors())

app.get('/api/users/:id/payments', function (req, res) {
    res.send(getPaymentsByLoanId(req.params.id))
})

app.listen(PORT, () => {
    console.log(`Server started`)
    console.log(`Server Listening on PORT:", ${PORT}`);
});


