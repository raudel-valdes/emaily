const mongoose = require('mongoose');
//the code below 
//const Schema = mongoose.Schema;
//can be destructured to the code below
const { Schema } = mongoose

const userSchema = new Schema({
    googleID: String,
    credits: { type: Number, default: 0 }
});

//tells mongo that we want to create a new
//collection called users and then you pass
//it in the data for that collection
mongoose.model('users', userSchema);