const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('loansdb.sql');

//IN PROGRESS
const addPayment = async (payment) => {
    try {
        await db.run("INSERT INTO payments (date, amount, loandId) VALUES (?, ?,?)", [payment.date, payment.amount, payment.loandId]);
        console.log('Datos insertados exitosamente');
    } catch (error) {
        console.error('Error al insertar datos:', error);
    }
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

module.exports = { getPaymentsByLoanId }