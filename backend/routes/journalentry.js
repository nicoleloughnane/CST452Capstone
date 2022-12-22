//this is the route for journal entries to support basic CRUD operations
const { JournalEntry } = require("../models/journalentry");
const express = require("express");
const router = express.Router();
const date = new Date();
//get all journal entries
router.get(`/`, async (req, res) => {
  const journalEntryList = await JournalEntry.find();
  if (!journalEntryList) {
    res.status(500).json({ success: false });
  }
  res.send(journalEntryList);
});

//get all journal entries
router.get(`/:id`, async (req, res) => {
  const journalEntry = await JournalEntry.findById(req.params.id);
  if (!journalEntry) {
    res.status(500).json({ message: "Journal entry with the given ID not found" });
  }
  res.status(200).send(journalEntry);
});

//POST/CREATE a new journal entry
router.post('/newjournalentry', async(req, res) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    today.toDateString(); 
    console.log(today);
    
    let journalEntry = new JournalEntry({
        title: req.body.title,
        entryBody: req.body.entryBody,
        entryDate: today
    })

    journalEntry = await journalEntry.save();

    if(!journalEntry) {
        return res.status(400).send('the journal entry cannot be created')
    }
    res.send(journalEntry);

})


//UPDATE/PUT existing journal entry
router.put("/:id", async (req, res) => {
  const journalEntry = await JournalEntry.findByIdAndUpdate(
    req.params.id,
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

//DELETE entry by ID
router.delete("/:id", (req, res) => {
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
