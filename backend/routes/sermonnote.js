//this is the route for journal entries to support basic CRUD operations
const { SermonNote } = require("../models/sermonnote");
const express = require("express");
const router = express.Router();
const { DateTime } = require("luxon");

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

//POST/CREATE a new sermon note
router.post("/", async (req, res) => {
  //the date of the sermon note
  const dt = DateTime.now();
  const sermonNoteDate = dt.month + "/" + dt.day + "/" + dt.year;
  //console.log("date: " + sermonNoteDate);
  let sermonNote = new SermonNote({
    title: req.body.title,
    entryBody: req.body.entryBody,
    entryDate: sermonNoteDate,
    pastor: req.body.pastor,
  });

  sermonNote = await sermonNote.save();

  if (!sermonNote) {
    return res.status(400).send("the sermon note cannot be created");
  }
  res.send(sermonNote);
});

//UPDATE/PUT existing sermon note
router.put("/:id", async (req, res) => {
  const sermonNote = await SermonNote.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      entryBody: req.body.entryBody,
      entryDate: req.body.entryDate,
      pastor: req.body.pastor,
    },
    { new: true }
  );
  if (!sermonNote) {
    return res.status(400).send("the sermon note cannot be updated");
  }
  res.send(sermonNote);
});

//DELETE entry by ID
router.delete("/:id", (req, res) => {
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
