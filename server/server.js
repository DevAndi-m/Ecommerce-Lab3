const express = require('express');
const mongoose = require('mongoose');
const User = require('./user.model.schema');
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
    
    app.get('/api', (req, res) => {
        res.json(
            {
                name: "Andi",
                surname: "Morina"
            }
        )
    })

    app.post('/api', async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    })
}) 
.catch(() => {
    console.log('connection to database failed');
})