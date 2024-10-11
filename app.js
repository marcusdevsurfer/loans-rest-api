import { DB } from './connect.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
const app = express();
app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200);
    res.send('Home');
});

app.get('/api', (req, res) => {
    res.set('content-type', 'application/json');
    const sql = 'SELECT * FROM payments';
    let data = { payments: [] };
    try {
        DB.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                data.payments.push({ id: row.payment_id, date: row.payment_date, amount: row.payment_amount, loanId: row.payment_loanId });
            });
            let content = JSON.stringify(data);
            res.send(content);
        });
    } catch (err) {
        console.log(err.message);
        res.status(467);
        res.send(`{"code":467, "status":"${err.message}"}`);
    }
});

app.get('/api/loan/:id/payments', (req, res) => {
    res.set('content-type', 'application/json');
    const sql = 'SELECT * FROM payments WHERE payment_loanId=?';
    let data = { payments: [] };
    try {
        DB.all(sql, req.params.id, (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                data.payments.push({ date: row.payment_date, amount: row.payment_amount, loanId: row.payment_loanId });
            });
            let content = JSON.stringify(data);
            res.send(content);
        });
    } catch (err) {
        console.log(err.message);
        res.status(467);
        res.send(`{"code":467, "status":"${err.message}"}`);
    }
});

app.post('/api', (req, res) => {
    console.log(req.body);
    res.set('content-type', 'application/json');
    const sql = 'INSERT INTO payments(payment_date, payment_amount, payment_loanId) VALUES (? , ?, ?)';
    let newId;
    try {
        DB.run(sql, [req.body.date, req.body.amount, req.body.loanId], function (err) {
            if (err) throw err;
            newId = this.lastID; //provides the auto increment integer enemy_id
            res.status(201);
            let data = { status: 201, message: `Payment: ${newId} saved.` };
            let content = JSON.stringify(data);
            res.send(content);
        });
    } catch (err) {
        console.log(err.message);
        res.status(468);
        res.send(`{"code":468, "status":"${err.message}"}`);
    }
});

// app.delete('/api', (req, res) => {
//   res.set('content-type', 'application/json');
//   const sql = 'DELETE FROM enemies WHERE enemy_id=?';
//   try {
//     DB.run(sql, [req.query.id], function (err) {
//       if (err) throw err;
//       if (this.changes === 1) {
//         //one item deleted
//         res.status(200);
//         res.send(`{"message":"Enemy ${req.query.id} was removed from list."}`);
//       } else {
//         //no delete done
//         res.status(200);
//         res.send(`{"message":"No operation needed."}`);
//       }
//     });
//   } catch (err) {
//     console.log(err.message);
//     res.status(468);
//     res.send(`{"code":468, "status":"${err.message}"}`);
//   }
// });

app.listen(3000, (err) => {
    if (err) {
        console.log('ERROR:', err.message);
    }
    console.log('LISTENING on port 3000');
});