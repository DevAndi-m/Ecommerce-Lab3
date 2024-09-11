require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors package
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');
const purchasedProductRoutes = require('./routes/purchasedProduct.route');
const purchaseRoutes = require('./routes/purchase.route');
const app = express();
const port = 5000;

// MIDDLEWARE
app.use(express.json());

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

// ROUTES
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/purchasedProducts', purchasedProductRoutes);
app.use('/api/purchases', purchaseRoutes);

// Connect to MongoDB and start the server
mongoose.connect("mongodb+srv://andiyt72:3HFpHG4SnaXYyLZQ@lab2test.tlxmt3t.mongodb.net/lab2test?retryWrites=true&w=majority&appName=lab2test")
.then(() => {
    console.log('Connected to the database');
    app.listen(port, () => {
        console.log('Server is running on port ' + port);
    });
})
.catch(() => {
    console.log('Connection to database failed');
});
