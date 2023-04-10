//this is the main app.js file that uses express, cors, morgan, and mongoose
//routes are here as well as connection to the database
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const morgan = require("morgan");
const mongoose = require("mongoose");
//jwt
const authjwt = require("./middlewares/authjwt");
//for .env file
require("dotenv/config");
const api = process.env.API_URL;
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "info" || "error";

//middleware - express, morgan
app.use(express.json());
app.use(morgan("tiny"));
app.use(authjwt());

//routes here
const usersRoute = require("./routes/user");
const journalEntriesRoute = require("./routes/journalentry");
const sermonNotesRoute = require("./routes/sermonnote");

app.use(`${api}/user`, usersRoute);
app.use(`${api}/journalentry`, journalEntriesRoute);
app.use(`${api}/sermonnote`, sermonNotesRoute);

//connect using connection string from .env file
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "backendv1",
  })
  .then(() => {
    //console.log("Database connection is ready");
    logger.info("Database connection established");
    
  })
  .catch((err) => {
    //console.log(err);
    logger.error("error connecting to database: " + err);
  });

//running on localhost 
app.listen(3000, () => {
  //console.log(api);
  console.log("server is running locally");
});
