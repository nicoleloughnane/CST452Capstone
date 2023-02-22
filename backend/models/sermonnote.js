//this is the model for a sermon note and what it would contain upon its creation
//by a user
const mongoose = require("mongoose");
const sermonnoteSchema = new mongoose.Schema({
  title: String,
  entryBody: String,
  entryDate: String,
  pastor: String,
});

exports.SermonNote = mongoose.model(
  "SermonNote",
  sermonnoteSchema,
  "sermonnote"
);
