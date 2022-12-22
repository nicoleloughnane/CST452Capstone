//this is the model for a journal entry and what it would contain upon its creation
//by a user
const mongoose = require('mongoose');
const journalSchema = new mongoose.Schema({
    title: String,
    entryBody: String,
    entryDate: String

});

//change _id to id to make more user friendly
journalSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

//enable virtuals
journalSchema.set('toJSON', {
    virtuals: true,
});


exports.JournalEntry = mongoose.model('JournalEntry', journalSchema, 'journalentry');