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
const getPaymentsByLoanId = async (id) => {
    const query = "SELECT * FROM payments WHERE loanId =" + id
    try {
        const payments = await db.get(query);
        return payments
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}

module.exports = { getPaymentsByLoanId, addPayment }