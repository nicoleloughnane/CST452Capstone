//this is the route for journal entries to support basic CRUD operations
const { JournalEntry } = require("../models/journalentry");
const { User } = require('../models/user');
const express = require("express");
const router = express.Router();
const { DateTime } = require("luxon");
const mongoose = require('mongoose');

//get all journal entries
router.get(`/`, async (req, res) => {
  const journalEntryList = await JournalEntry.find();
  if (!journalEntryList) {
    res.status(500).json({ success: false });
  }
  res.send(journalEntryList);
});

//get journal entries for specific user
router.get(`/getByUserId/:id`, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }

  const userID = req.params.id;
  //console.log("in get journal entries byUserId. userID is: " + userID);
  const journalEntryList = await JournalEntry.find({user: mongoose.Types.ObjectId(userID)});
  if (!journalEntryList) {
    res.status(500).json({ success: false });
  }
  res.send(journalEntryList);
} catch(error) {
  console.log('error has occurred in journal entries by userId');
  res.status(500).send('Server error');

}
});

//get journal entry by ID by userID
router.get(`/byEntryId/:userId/:entryId`, async (req, res) => {
  //parameters
  const userID = req.params.userId;
  const entryID = req.params.entryId;

  //see if user exists
  const user = await User.findById(userID);
    if(!user) {
      return res.status(500).json({ message: "Journal entry with the given ID cannot be found because user account was unable to be located" });
    }

  //find journal entry
  const journalEntry = await JournalEntry.findById(entryID);
  if (!journalEntry) {
    return res.status(500).json({ message: "Journal entry with the given ID not found" });
  }
  return res.status(200).send(journalEntry);
});

//UPDATE/PUT existing journal entry
router.put(`/update/:userId/:entryId`, async (req, res) => {
  const userID =req.params.userId;
  const entryID = req.params.entryId;

  //console.log("in update journal entry byUserId. userID is: " + userID);

   //see if user exists
   const user = await User.findById(userID);
   if(!user) {
     return res.status(500).json({ message: "Journal entry with the given ID cannot be updated because user account was unable to be located" });
   }

  const journalEntry = await JournalEntry.findByIdAndUpdate(
    entryID,
    {
      title: req.body.title,
      entryBody: req.body.entryBody,
      entryDate : req.body.entryDate
    },
    { new: true }
  );
  if (!journalEntry) {
    return res.status(400).send("the journal entry cannot be updated");
  }
  res.send(journalEntry);
});


//POST/CREATE a new journal entry with user ID
router.post('/create/:id', async(req, res) => {
    //the date of the journal entry
    const dt = DateTime.now();
    const journalEntryDate = dt.toLocaleString(DateTime.DATE_FULL);
    const userID = req.params.id;
    //console.log("in post new journal entry userID: " + userID);
    //see if user exists
  const user = await User.findById(userID);
  if(!user) {
    return res.status(500).json({ message: "Journal entry with the given ID cannot be found because user account was unable to be located" });
  }
   
    let journalEntry = new JournalEntry({
        user: user,
        title: req.body.title,
        entryBody: req.body.entryBody,
        entryDate: journalEntryDate
    })
    journalEntry = await journalEntry.save();

    if(!journalEntry) {
        return res.status(400).send('the journal entry cannot be created')
    }
    res.send(journalEntry);

})


//DELETE entry by ID
router.delete("/delete/:id", (req, res) => {
  JournalEntry.findByIdAndRemove(req.params.id)
    .then((journalEntry) => {
      if (journalEntry) {
        return res
          .status(200)
          .json({ success: true, message: "the journal entry has been deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "journal entry not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
