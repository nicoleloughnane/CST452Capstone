//this is the route for journal entries to support basic CRUD operations
const { SermonNote } = require("../models/sermonnote");
const { User } = require('../models/user');
const express = require("express");
const router = express.Router();
const { DateTime } = require("luxon");
const mongoose = require('mongoose');

//get all sermon notes
router.get(`/`, async (req, res) => {
  const sermonNoteList = await SermonNote.find();
  if (!sermonNoteList) {
    res.status(500).json({ success: false });
  }
  res.send(sermonNoteList);
});

//get sermon note by ID
router.get(`/:id`, async (req, res) => {
  const sermonNote = await SermonNote.findById(req.params.id);
  if (!sermonNote) {
    res
      .status(500)
      .json({ message: "Sermon note with the given ID not found" });
  }
  res.status(200).send(sermonNote);
});

//get sermon note entries for specific user
router.get(`/getByUserId/:id`, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }

  const userID = req.params.id;
  //console.log("in get sermon notes byUserId. userID is: " + userID);
  const sermonNoteList = await SermonNote.find({user: mongoose.Types.ObjectId(userID)});
  if (!sermonNoteList) {
    res.status(500).json({ success: false });
  }
  res.send(sermonNoteList);
} catch(error) {
  console.log('error has occurred in get sermon notes by userId');
  res.status(500).send('Server error');

}
});

//get sermon note by ID by userID
router.get(`/byEntryId/:userId/:entryId`, async (req, res) => {
  //parameters
  const userID = req.params.userId;
  const entryID = req.params.entryId;
  //console.log('in get sermon note entry, entry id is ' + this.entryId + 'userId is ' + this.userID);

  //see if user exists
  const user = await User.findById(userID);
    if(!user) {
      return res.status(500).json({ message: "Sermon note with the given ID cannot be found because user account was unable to be located" });
    }

  //find journal entry
  const sermonNote= await SermonNote.findById(entryID);
  if (!sermonNote) {
    return res.status(500).json({ message: "Sermon note with the given ID not found" });
  }
  return res.status(200).send(sermonNote);
});

//POST/CREATE a new sermon note with user ID
router.post('/create/:id', async(req, res) => {
  //the date of the sermon note
  const dt = DateTime.now();
  const sermonNoteDate = dt.toLocaleString(DateTime.DATE_FULL);
  const userID = req.params.id;
  //console.log("in post new sermon note userID: " + userID);
  //see if user exists
const user = await User.findById(userID);
if(!user) {
  return res.status(500).json({ message: "Sermon note with the given ID cannot be found because user account was unable to be located" });
}

  let sermonNote = new SermonNote({
      user: user,
      title: req.body.title,
      entryBody: req.body.entryBody,
      entryDate: sermonNoteDate,
      pastor: req.body.pastor
  })
  sermonNote = await sermonNote.save();

  if(!sermonNote) {
      return res.status(400).send('the sermon note cannot be created')
  }
  res.send(sermonNote);

})


//UPDATE/PUT existing sermon note
router.put(`/update/:userId/:entryId`, async (req, res) => {
  const userID =req.params.userId;
  const entryID = req.params.entryId;

  //console.log("in update sermon note byUserId. userID is: " + userID);

   //see if user exists
   const user = await User.findById(userID);
   if(!user) {
     return res.status(500).json({ message: "Sermon note with the given ID cannot be updated because user account was unable to be located" });
   }

  const sermonNote = await SermonNote.findByIdAndUpdate(
    entryID,
    {
      title: req.body.title,
      entryBody: req.body.entryBody,
      entryDate : req.body.entryDate,
      pastor: req.body.pastor
    },
    { new: true }
  );
  if (!sermonNote) {
    return res.status(400).send("the sermon note cannot be updated");
  }
  res.send(sermonNote);
});


//DELETE entry by ID
router.delete("/delete/:id", (req, res) => {
  SermonNote.findByIdAndRemove(req.params.id)
    .then((sermonNote) => {
      if (sermonNote) {
        return res.status(200).json({
          success: true,
          message: "the sermon note has been deleted",
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "sermon note not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
