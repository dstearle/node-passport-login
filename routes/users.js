// Imports
const express = require('express');
const router = express.Router();

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

        res.send('pass');

    }

});

module.exports = router;