MONGO ADMIN
--andiyt72
--************

mongodb+srv://andiyt72:<password>@backenddb.we6ijj2.mongodb.net/
mongodb+srv://andiyt72:**************@backenddb.we6ijj2.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB

OTHER DB:
andiyt72
3HFpHG4SnaXYyLZQ
mongodb+srv://andiyt72:3HFpHG4SnaXYyLZQ@lab2test.tlxmt3t.mongodb.net/?retryWrites=true&w=majority&appName=lab2test

qelet follderi front edhe back
per me u manovru n'cli punohet me cd manej ku po don me shku ose .. per mu kthy mrapa

(instalohet node patjeter)
front: npx create-react-app my-app 

START BACK

back: npm init -y (per me ta kriju ni package.json)

server folder>package.json - mir esht me e ndru emrin e mainit psh server.js se ka plot indexa

e krijon mrena follderit server.js

npm i express 
npm i nodemon -D ("-D" mi tregu qe esht dev dependeny, sdi pse)

qeshtu bohet pjesa e scripts npackage.json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "node server.js",
    "start": "node server",
    "dev": "nodemon server"
},

START FRONT

NESE DON: munesh me hi npackage.json edhe me kriju ni rresht tri permi dependencies: "proxy": "http://localhost:5000" per mi 
bo requestat ma t'thjesht, sesht e nevojshme ama nese ki qef. Une skam me bo.

per fetcha mso useEffect, useState edhe do hooka tjer -react

BACK

const express = require('express');
const app = express();

const port = 5000;

per me startu serverin:
app.listen(port, () => {
    console.log('Server is running on port ' + port)
})

Me qu diqka...:
app.get('/api', (req, res) => {
    res.json({message: "userFive"})
}) 

FRONT 

e kap qeshtu:

const [consoleData, setConsoleData] = useState([{}])

    useEffect(() => {
        fetch("http://localhost:5000/api")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.json();
            })
            .then(data => {
                setConsoleData(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

Munden me dal 2 errore qe mkan dal mu.

-cant fetch json in response diqka
-SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON error on json

n'front response.json() sbon mu thirr dy her,
esht ni protokol qe thot sbon me i marr tdhanunat prej ni site tjeter per security reasons edhe e ka emrin cors. Per me zgjidh
n'back te server.js:

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

para se me fillu serverin btw.

// TODO (chronological)

#1 - show all products, --DONE
#2 - make view single product --DONE
#3 - Show added to cart products of user. (not saved if logged off)
#4 - make addToCart with user (addToCart -> isLoggedIn = false -> send to AccoutPage)
#5 - make purchase API 
#6 - Show purchase history of user (purchasedProudcts)
#7 - Make CreateListing/MyProductsForSale (CRUD)

#8 MAKE IMAGES WORK!!! 


