//this is the model for a journal entry and what it would contain upon its creation
//by a user
const mongoose = require('mongoose');
const journalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    title: String,
    entryBody: String,
    entryDate: String

});



exports.JournalEntry = mongoose.model('JournalEntry', journalSchema, 'journalentry');