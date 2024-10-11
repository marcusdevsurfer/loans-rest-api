import sqlite3 from 'sqlite3';
const sql3 = sqlite3.verbose();

// const DB = new sql3.Database(':memory:', sqlite3.OPEN_READWRITE, connected);
// const DB = new sql3.Database('', sqlite3.OPEN_READWRITE, connected);
const DB = new sql3.Database('./mydata.db', sqlite3.OPEN_READWRITE, connected);
//const DB = new sql3.Database('./mydatatest.db', sqlite3.OPEN_READWRITE, connected);


function connected(err) {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log('Created the DB or SQLite DB does already exist');
}

const sql = "CREATE TABLE IF NOT EXISTS payments(payment_date TEXT,payment_amount INT,payment_loanId INT)";

DB.run(sql, [], (err) => {
    //callback function
    if (err) {
        console.log('error creating payments table');
        console.log(err)
        return;
    }
    console.log('CREATED TABLE');
});

export { DB };