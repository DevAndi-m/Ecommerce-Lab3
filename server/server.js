const express = require('express');
const mongoose = require('mongoose');
const User = require('./user.model.schema');
const Product = require('./product.model.schema')
const PurchasedProduct = require('./purchasedProduct.schema')
const app = express();

const port = 5000;

app.use(express.json());

// CORS (cross origin diqka) - pe nal webfaqen me marr ose me qu info me ni faqe tjeter qkado qe esht
// me ket kod e ndreq problemin veq duhet mi thon pi kujna lejohet
app.use(function(req, res, next) {
    // qetu
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    // qka munet me bo
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    // kto spe di
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect("mongodb+srv://andiyt72:3HFpHG4SnaXYyLZQ@lab2test.tlxmt3t.mongodb.net/lab2test?retryWrites=true&w=majority&appName=lab2test")
.then(() => {
    console.log('connected to the database');

    app.listen(port, () => {
        console.log('Server is running on port ' + port)
    })  



    // GET REQUESTS
    app.get('/api', (req, res) => {
        res.json(
            {
                name: "Andi",
                surname: "Morina"
            }
        )
    })

    app.get('/api/users', async (req, res) => {
        try {   
            const users = await User.find({}).lean();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })

    app.get('/api/products', async (req, res) => {
        try {   
            const products = await Product.find({}).lean();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })

    app.get('/api/purchasedProducts', async (req, res) => {
        try {   
            const purchasedProducts = await PurchasedProduct.find({}).lean();
            res.status(200).json(purchasedProducts);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })

    // single items GET

    app.get('/api/user/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id).lean();
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
    

    app.get('./api/product:id', async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findById(id).lean();
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })

    app.get('./api/purchasedProduct:id', async (req, res) => {
        try {
            const { id } = req.params;
            const purchasedProduct = await User.findById(id).lean();
            if (!purchasedProduct) {
                return res.status(404).json({ message: "Purchased product not found" });
            }
            res.status(200).json(purchasedProduct)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })


    // POST REQUESTS
    app.post('/api/users', async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    })

    app.post('/api/products', async (req, res) => {
        try {
            const product = await Product.create(req.body);
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    })

    app.post('/api/purchasedProducts', async (req, res) => {
        try {
            const purchasedProduct = await PurchasedProduct.create(req.body);
            res.status(200).json(purchasedProduct)
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    })
     
    // UPDATE USER
    app.put('/api/user/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const filter = { _id: id };
    
            const updatedUser = await User.findOneAndUpdate(filter, req.body, { new: true }); 
    
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found!" });
            }
    
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
    

    app.put('/api/product/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const filter = { _id: id };
            const product = await User.findOneAndUpdate(filter, req.body, { new: true });

            if(!product) {
                return res.status(404).json({message: "Product not found!"})
            }

            const updatedProduct = await Product.findById(id).lean()
            res.status(200).json(updatedProduct)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })

    app.put('/api/purchasedProduct/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const filter = { _id: id };
            const purchasedProduct = await PurchasedProduct.findOneAndUpdate(filter, req.body, { new: true });

            if(!purchasedProduct) {
                return res.status(404).json({message: "Purchased product not found!"})
            }

            const updatedPurchasedProduct = await PurchasedProduct.findById(id).lean()
            res.status(200).json(updatedPurchasedProduct)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })

    // DELETE API

    app.delete('/api/user/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const filter = {_id: id};

            const user = await User.findByIdAndDelete(filter, req.body, { new: true })

            if(!user) {
                return res.status(404).json({message: "User not found!"})
            }

            res.status(200).json({message: `User: ${user.userName} has been deleted!`})
        } catch (error) {
           res.status(500).json({message: error.message}) 
        }
    })

    app.delete('api/product/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const filter = {_id: id}

            const product = await Product.findByIdAndDelete(filter, req.body, { new: true })

            if(!product) {
                res.status(404).json({message: "Product not found"})
            }

            res.status(200).json({message: `Product: ${product.productName} has been deleted!`})

        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })

    app.delete('api/purchasedProduct/:id'), async (req, res) => {
        try {
            const id = req.params;
            const filter = {_id: id}

            const purchasedProduct = await PurchasedProduct.findByIdAndDelete(filter, res.body, { new: true })

            if(!purchasedProduct) {
                res.status(404).json({message: "Purchased product has not been found!"})
            }

            res.status(200).json({message: `Purchased product ${purchasedProduct.productName} has been deleted!`})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}) 
.catch(() => {
    console.log('connection to database failed');
})