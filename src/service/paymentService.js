const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('loansdb.sqlite');

const addPayment = (res, date, amount, loanId) => {
    const sql = 'INSERT INTO payments (date,amount,loanId) VALUES (?,?,?)'
    const params = [date, amount, loanId]
    db.run(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({
            "message": "success",
        })
    });
}
const getPaymentsByLoanId = (res, id) => {
    const sql = `SELECT * FROM payments WHERE loanId = ?`
    const params = [id]
    db.all(sql, params, (err, result) => {
        if (err) {
            res.status(404).json({ "error": err.message })
            return
        }
        return res.json(result)
    });
}

module.exports = { getPaymentsByLoanId, addPayment }