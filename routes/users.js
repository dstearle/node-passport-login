// Imports
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// User Model
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Handler
router.post('/register', (req, res) => {

    // The values to be pulled from the fields
    const { name, email, password, password2 } = req.body;

    // An array to hold error messages
    let errors = [];

    // Check required fields
    if(!name || !email || !password || !password2) {

        errors.push({ msg: 'Please fill in all fields!' });

    }

    // Check if passwords match
    if(password !== password2) {

        errors.push({ msg: 'Passwords do not match!'});

    }

    // Check password length
    if(password.length < 6) {

        errors.push({ msg: 'Password needs to be longer than 6 characters!'});

    }

    // If there are any errors...
    if(errors.length > 0) {
        
        res.render('register', {

            errors,
            name,
            email,
            password,
            password2

        });

    }

    // Else submit the field
    else {

        User.findOne({ email: email })

            .then(user => {

                // If the user already exists in the database
                if(user) {

                    errors.push({ msg: 'Email is already registered!'});

                    res.render('register', {

                        errors,
                        name,
                        email,
                        password,
                        password2
            
                    });
                    
                }

                // Else if it is a new user
                else {

                    // The new user data
                    const newUser = new User({

                        name,
                        email,
                        password

                    });

                    // Hash Password
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {

                            // Throw error if something goes wrong
                            if(err) throw err;

                            // Set user password to hashed password
                            newUser.password = hash;

                            // Save the new user to the database
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'Success! You are now registered and have a big dick!');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));

                        })
                    )

                }

            });

    }

});

module.exports = router;