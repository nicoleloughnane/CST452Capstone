//this is the model for a sermon note and what it would contain upon its creation
//by a user
const mongoose = require("mongoose");
const sermonnoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
},
  title: String,
  entryBody: String,
  entryDate: String,
  pastor: String,
  verses: Array,
});

exports.SermonNote = mongoose.model(
  "SermonNote",
  sermonnoteSchema,
  "sermonnote"
);
