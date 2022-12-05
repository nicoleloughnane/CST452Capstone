const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const morgan = require('morgan');
const mongoose = require('mongoose');

//const authJwt = require('./helpers/jwt');
//const errorHandler = require('./helpers/error-handler');

//for .env file
//run npm start 
require('dotenv/config');
const api = process.env.API_URL;

//middleware - express, morgan, and jwt
app.use(express.json());
app.use(morgan('tiny'));
//app.use(authJwt());

   



//routes here
const usersRoute = require('./routes/user');
app.use(`${api}/user`, usersRoute);
//journal entries
//sermon notes

//connect using connection string from .env file
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'backendv1',
})
.then(()=>{
    console.log('Database connection is ready');
})
.catch((err)=>{
    console.log(err);
})



app.listen(3000, ()=> {
    console.log(api);
    console.log('server is running at http://localhost:3000');
})