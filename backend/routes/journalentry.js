//this is the route for journal entries to support basic CRUD operations
const { JournalEntry } = require("../models/journalentry");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const { DateTime } = require("luxon");
const mongoose = require("mongoose");
//logging with log4js
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "info" || "error";

//GET all journal entries BY User ID
router.get(`/getByUserId/:id`, async (req, res) => {
  //parameter
  const userID = req.params.id;

  //verify that the user exists, if not found throw error
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      logger.error("ERROR in get journal entries by userId, user not found");
      return res
        .status(404)
        .send(
          "Journal entries by user ID not found because user account was unable to be located"
        );
    }
    //user has been found at this point, find the entries by their ID, if list not found, throw error
    const journalEntryList = await JournalEntry.find({
      user: mongoose.Types.ObjectId(userID),
    });
    if (!journalEntryList) {
      logger.error(
        "ERROR in get journal entries by userId, journal entries not found"
      );
      res.status(500).json({ success: false });
    }
    //success - return the list of journal entries
    logger.info("SUCCESS - journal entries found");
    res.send(journalEntryList);
  } catch (error) {
    logger.error("ERROR in get journal entries by userId: " + error);
    res.status(500).send("Server error");
  }
});

//GET journal entry BY ID BY User ID
router.get(`/byEntryId/:userId/:entryId`, async (req, res) => {
  //parameters
  const userID = req.params.userId;
  const entryID = req.params.entryId;

  //verify that the user exists, if not found return error
  const user = await User.findById(userID);
  if (!user) {
    logger.error("ERROR in get journal entry by id by userId, user not found");
    return res
      .status(404)
      .json({
        message:
          "Journal entry with the given ID cannot be found because user account was unable to be located",
      });
  }

  //verify that journal entry with the given id exists, if not then return error
  const journalEntry = await JournalEntry.findById(entryID);
  if (!journalEntry) {
    logger.error(
      "ERROR in get journal entry by id by userId, journal entry with given ID not found"
    );
    return res
      .status(500)
      .json({ message: "Journal entry with the given ID not found" });
  }
  //success - return journal entry
  logger.info("SUCCESS - journal entry found: " + journalEntry);
  return res.status(200).send(journalEntry);
});

//UPDATE/PUT existing journal entry
router.put(`/update/:userId/:entryId`, async (req, res) => {
  //parameters
  const userID = req.params.userId;
  const entryID = req.params.entryId;

  //verify that the user exists, if not found return error
  const user = await User.findById(userID);
  if (!user) {
    logger.error("ERROR in update journal entry, user not found");
    return res
      .status(404)
      .json({
        message:
          "Journal entry with the given ID cannot be updated because user account was unable to be located",
      });
  }

  //user found, find the entry by ID and update
  const journalEntry = await JournalEntry.findByIdAndUpdate(
    entryID,
    {
      title: req.body.title,
      entryBody: req.body.entryBody,
      entryDate: req.body.entryDate,
      mood: req.body.mood,
    },
    { new: true }
  );

  //verify that journal entry with the given id exists and can be updated, if not then return error
  if (!journalEntry) {
    logger.error("ERROR in update journal entry, cannot be updated");
    return res.status(400).send("the journal entry cannot be updated");
  }
  //success - return updated journal entry
  logger.info("SUCCESS - journal entry updated: " + journalEntry);
  res.send(journalEntry);
});

//POST/CREATE a new journal entry
router.post("/create/:id", async (req, res) => {
  //the date of the journal entry upon its creation is stored as an ISO
  const dt = DateTime.now();
  const journalEntryDate = dt.toISO();

  //parameter
  const userID = req.params.id;

  //verify that the user exists, if not found return error
  const user = await User.findById(userID);
  if (!user) {
    logger.error("ERROR in create journal entry, user not found");
    return res
      .status(404)
      .json({
        message:
          "Journal entry cannot be created because user account was unable to be located",
      });
  }

  //user has been found, create the new journal entry
  let journalEntry = new JournalEntry({
    user: user,
    title: req.body.title,
    entryBody: req.body.entryBody,
    entryDate: journalEntryDate,
    mood: req.body.mood,
  });
  journalEntry = await journalEntry.save();

  //verify that journal entry was created, if not then return error
  if (!journalEntry) {
    logger.error("ERROR in create journal entry, cannot be created");
    return res.status(400).send("the journal entry cannot be created");
  }

  //success - return created journal entry
  logger.info("SUCCESS - journal entry created: " + journalEntry);
  res.send(journalEntry);
});

//DELETE entry BY ID
router.delete("/delete/:id", (req, res) => {
  //find journal entry by ID and remove
  JournalEntry.findByIdAndRemove(req.params.id)
    .then((journalEntry) => {
      //if entry was found, return success message
      if (journalEntry) {
        logger.info("SUCCESS - journal entry deleted: " + journalEntry);
        return res
          .status(200)
          .json({
            success: true,
            message: "the journal entry has been deleted",
          });
      } else {
        //error has occurred
        logger.error("ERROR in delete journal entry, cannot be deleted");
        return res
          .status(404)
          .json({
            success: false,
            message:
              "journal entry was not able to be deleted as it was unable to be located",
          });
      }
    })
    //other error occurred
    .catch((err) => {
      logger.error("ERROR in delete journal entry, cannot be deleted: " + err);
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
