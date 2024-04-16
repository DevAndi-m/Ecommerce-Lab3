const express = require('express');
const mongoose = require('mongoose');
const app = express();

const port = 5000;

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
        res.json([
        {
            username: "userOne",
            useremail: "userOne@mail.com",
            userDateOfCreation: {
                day: 2,
                month: 5,
                year: 1999
            }
        },
        {
        username: "userTwo",
        useremail: "userTwo@mail.com",
        userDateOfCreation: {
            day: 5,
            month: 11,
            year: 2000
        }
        },
        {
        username: "userThree",
        useremail: "userThree@mail.com",
        userDateOfCreation: {
            day: 1,
            month: 1,
            year: 1111
        }
        }  
        ])
    })
}) 
.catch(() => {
    console.log('connection to database failed');
})