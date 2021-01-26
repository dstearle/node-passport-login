// Imports
const mongoose = require('mongoose');

// Schema
const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

});

// User Model
const User = mongoose.model('User', UserSchema);

// Exports 'User' to be used by other files
module.exports = User;