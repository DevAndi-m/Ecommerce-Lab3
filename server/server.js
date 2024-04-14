const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from node API UPD')
})

mongoose.connect('mongodb+srv://andiyt72:k9J8wK5roIunMGre@backenddb.we6ijj2.mongodb.net/Lab2?retryWrites=true&w=majority&appName=BackendDB')
    .then(()=> {
        console.log('connected to the db')

        app.listen(5000, () => {
            console.log('Server is running on port 5000')
        })
    })
    .catch(()=> {
        console.log('connection to db failed')   
    })