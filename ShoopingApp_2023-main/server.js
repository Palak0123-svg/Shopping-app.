const express = require('express');
const dotenv = require('dotenv');
const path = require('path')
//const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');


// configure env
dotenv.config();

// router import
//import authRoutes from './routes/authRoutes.js'
const authRoutes =require('./routes/authRoutes.js')
const categoryRoutes = require("./routes/categoryRoutes.js")
const productRoutes = require("./routes/productRoutes.js")
// database config
connectDB();

// rest object
const app = express();

//middlesware
app.use(express.json()); 
// pehle body parser ka use krte the but ab express me json ka use krte hai
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname,"./client/build")))


// routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);

// rest api
app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})
// port
//const PORT = 8080;

const PORT = process.env.PORT || 8080

// listen

app.listen(PORT,()=>{
    console.log(`server runing in mode of ${process.env.DEV_MODE}on ${PORT}`.bgCyan.white);
})


//AIMLGFWynGtinCmX

//o4j5loOD6hPC4jOS