const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');
const purchasedProductRoutes = require('./routes/purchasedProduct.route');
const app = express();
const port = 5000;

// MIDDLEWARE
app.use(express.json());
// CORS Middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// ROUTES
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/purchasedProducts', purchasedProductRoutes);

// Connect to MongoDB and start the server
mongoose.connect("mongodb+srv://andiyt72:3HFpHG4SnaXYyLZQ@lab2test.tlxmt3t.mongodb.net/lab2test?retryWrites=true&w=majority&appName=lab2test")
.then(() => {
    console.log('Connected to the database');
    app.listen(port, () => {
        console.log('Server is running on port ' + port)
    });
})
.catch(() => {
    console.log('Connection to database failed');
});
