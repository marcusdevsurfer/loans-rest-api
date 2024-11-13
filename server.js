import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import paymentRoutes from './routes/payments.js';
import loanRoutes from './routes/loans.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

//Midleware
app.use(cors())
app.use(express.json())


//Conexion a mongo db
mongoose.connect(process.env.MONGODB_DEV_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000, // Increase timeout to 30 seconds
    socketTimeoutMS: 50000 // Close sockets after 45 seconds of inactivity
})
    .then(() => console.log('Mongoose connected'))
    .catch(err => console.log(err))

// Rutas
app.use('/api/payments', paymentRoutes);
app.use('/api/loans', loanRoutes);

app.listen(PORT, (err) => {
    if (err) {
        console.log('ERROR:', err.message);
    }
    console.log(`LISTENING on port: ${PORT}`);
});


