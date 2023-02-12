//this is the main app.js file that uses express, cors, morgan, and mongoose
//routes are here as well as connection to the database
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const morgan = require('morgan');
const mongoose = require('mongoose');
const authjwt = require('./middlewares/authjwt');
//for .env file
require('dotenv/config');
const api = process.env.API_URL;

//middleware - express, morgan
app.use(express.json());
app.use(morgan('tiny'));
app.use(authjwt())

//routes here
const usersRoute = require('./routes/user');
const journalEntriesRoute = require('./routes/journalentry');
app.use(`${api}/user`, usersRoute);
app.use(`${api}/journalentry`, journalEntriesRoute)

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

//running on localhost port 3000
app.listen(3000, ()=> {
    console.log(api);
    console.log('server is running at http://localhost:3000');
})