const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    //login credentials: email and password
    email: String,
    password: String,
    firstName: String,
    lastName: String

});

//change _id to id to make more user friendly
userSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

//enable virtuals
userSchema.set('toJSON', {
    virtuals: true,
});


exports.User = mongoose.model('User', userSchema);