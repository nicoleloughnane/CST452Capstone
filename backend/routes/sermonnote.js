//this is the route for sermon notes to support basic CRUD operations
const { SermonNote } = require("../models/sermonnote");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const { DateTime } = require("luxon");
const mongoose = require("mongoose");
//logging with log4js
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "info" || "error";


//GET all Sermon notes BY ID by User ID
router.get(`/getByUserId/:id`, async (req, res) => {
  //parameter
  const userID = req.params.id;

  //verify that the user exists, if not found throw error
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      logger.error("ERROR in get sermon notes by userId, user not found");
      return res
        .status(404)
        .send(
          "Sermon note by user ID not found because user account was unable to be located"
        );
    }

    //at this point user is valid, get list of sermon notes, if list not found, throw error
    const sermonNoteList = await SermonNote.find({
      user: mongoose.Types.ObjectId(userID),
    });
    if (!sermonNoteList) {
      logger.error(
        "ERROR in get sermon notes by userId, sermon notes not found"
      );
      res.status(500).json({ success: false });
    }
    //success - return the list of sermon notes
    logger.info("SUCCESS - sermon notes found ");
    res.send(sermonNoteList);
  } catch (error) {
    logger.error("ERROR in get sermon notes by userId: " + error);
    res.status(500).send("Server error");
  }
});

//GET sermon note BY ID BY User ID
router.get(`/byEntryId/:userId/:entryId`, async (req, res) => {
  //parameters
  const userID = req.params.userId;
  const entryID = req.params.entryId;

  //verify that the user exists, if not found throw error
  const user = await User.findById(userID);
  if (!user) {
    logger.error("ERROR in get sermon note by ID by userId, user not found");
    return res
      .status(404)
      .json({
        message:
          "Sermon note with the given ID cannot be found because user account was unable to be located",
      });
  }

  //at this point user is valid, get sermon note by ID, if not found, throw error
  const sermonNote = await SermonNote.findById(entryID);
  if (!sermonNote) {
    logger.error(
      "ERROR in get sermon note by ID by userId, sermon note not found"
    );
    return res
      .status(500)
      .json({ message: "Sermon note with the given ID not found" });
  }
  //return valid sermon note
  logger.info("SUCCESS - sermon note found: " + sermonNote);
  return res.status(200).send(sermonNote);
});

//POST/CREATE a new sermon note
router.post("/create/:id", async (req, res) => {
  //the date of the sermon note upon its creation is stored as an ISO
  const dt = DateTime.now();
  const sermonNoteDate = dt.toISO();
  //parameter
  const userID = req.params.id;

  //verify that the user exists, if not found throw error
  const user = await User.findById(userID);
  if (!user) {
    logger.error("ERROR in create sermon note, user not found");
    return res
      .status(404)
      .json({
        message:
          "Sermon note cannot be created because user account was unable to be located",
      });
  }

  //user has been found, create the new sermon note
  let sermonNote = new SermonNote({
    user: user,
    title: req.body.title,
    entryBody: req.body.entryBody,
    entryDate: sermonNoteDate,
    pastor: req.body.pastor,
  });
  sermonNote = await sermonNote.save();

  //verify that sermon note was created, if not then return error
  if (!sermonNote) {
    logger.error("ERROR in create sermon note, could not be created ");
    return res.status(400).send("the sermon note cannot be created");
  }
  //success - return created sermon note
  logger.info("SUCCESS - sermon note created: " + sermonNote);
  res.send(sermonNote);
});

//UPDATE/PUT existing sermon note
router.put(`/update/:userId/:entryId`, async (req, res) => {
  //parameters
  const userID = req.params.userId;
  const entryID = req.params.entryId;

  //verify that the user exists, if not found throw error
  const user = await User.findById(userID);
  if (!user) {
    logger.error("ERROR in edit sermon note, user not found");
    return res
      .status(404)
      .json({
        message:
          "Sermon note with the given ID cannot be updated because user account was unable to be located",
      });
  }

  //at this point user is valid, find sermon note by ID and update, if not then return error
  const sermonNote = await SermonNote.findByIdAndUpdate(
    entryID,
    {
      title: req.body.title,
      entryBody: req.body.entryBody,
      entryDate: req.body.entryDate,
      pastor: req.body.pastor,
    },
    { new: true }
  );

  //error has occurred
  if (!sermonNote) {
    logger.error("ERROR in update sermon note, could not be updated ");
    return res.status(400).send("the sermon note cannot be updated");
  }
  //success - return updated sermon note
  logger.info("SUCCESS - sermon note updated: " + sermonNote);
  res.send(sermonNote);
});

//DELETE sermon note
router.delete("/delete/:id", (req, res) => {
  //find sermon note by ID and remove
  SermonNote.findByIdAndRemove(req.params.id)
    .then((sermonNote) => {
      //if sermon note was found, return success message
      if (sermonNote) {
        logger.info("SUCCESS - sermon note deleted: " + sermonNote);
        return res.status(200).json({
          success: true,
          message: "the sermon note has been deleted",
        });
      } else {
        //error has occurred
        logger.error("ERROR in delete sermon note, cannot be deleted");
        return res
          .status(404)
          .json({
            success: false,
            message:
              "sermon note was not able to be deleted as it was unable to be located",
          });
      }
    })
    .catch((err) => {
      logger.error("ERROR in delete sermon note, cannot be deleted");
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
