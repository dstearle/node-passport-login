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

                    // Checks if user email does not exists inform them with error message
                    if(!user){

                        return done(null, false, { message: 'That email is not registered'});

                    }

                    // Checks user password
                    bcrypt.compare(password, user.password, (err, isMatch) => {

                        // Throws error if something goes wrong
                        if(err) throw err;

                        // If password matches throw error as 'null' and provide user data
                        if(isMatch) {

                            return done(null, user);

                        }

                        // If password does not match throw error as 'null' and inform user of incorrect password
                        else {

                            return done(null, false, { message: 'Password is incorrect!' });

                        }

                    });

                })
                .catch(err => console.log(err));

        })

    );

}