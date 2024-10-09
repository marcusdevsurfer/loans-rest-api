const express = require("express");
const cors = require("cors")
const { getPaymentsByLoanId } = require('./data/data.js');
const app = express()
const PORT = process.env.PORT || 3000;


app.use(cors())

app.get('/api/users/:id/payments', function (req, res) {
    res.send(getPaymentsByLoanId(req.params.id))
})

app.listen(PORT, () => {
    console.log(`Server started`)
    console.log(`Server Listening on PORT:", ${PORT}`);
});


