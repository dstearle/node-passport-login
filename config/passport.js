// Imports
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Model
const User = require('../models/User');

module.exports = function(passport) {

    passport.use(

        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

            // Check to see if user email exists
            User.findOne({ email: email })
                .then(user => {

                    // If user email does not exists inform them with error message
                    if(!user){

                        return done(null, false, { message: 'That email is not registered'});

                    }

                })
                .catch(err => console.log(err));

        })

    );

}