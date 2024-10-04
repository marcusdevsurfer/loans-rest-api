const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;

app.get('/api/payments', (req, res) => {
    res.send([
        {
            "date": "16/08/2024",
            "loanId": 7,
            "amount": 3000
        },
        {
            "date": "23/08/2024",
            "loanId": 7,
            "amount": 3000
        },
        {
            "date": "30/08/2024",
            "loanId": 7,
            "amount": 3000
        }
    ])
})

app.listen(PORT, () => {
    console.log(`Server Listening on PORT:", ${PORT}`);
});


