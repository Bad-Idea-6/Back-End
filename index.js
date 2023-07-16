require('dotenv').config();

const express = require("express");
const PORT = 8080;
const app = express();



function myFirstMiddleware(req, res, next) {
    console.log("We have received a request")
    console.log("Now we will respond")
    next(); 
 }
 app.use(myFirstMiddleware)

 const morgan = require("morgan");
app.use(morgan("dev"));

const cors = require("cors");
app.use(cors());

 app.use(express.json());

 

 const client = require("./db/client")
 client.connect();

 app.use('/api', require('./api'))
 
 app.listen(PORT, () => {
    console.log(`We are now connected to port ${PORT}.`)
})
