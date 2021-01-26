// Imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

// Initialize Express
const app = express();

// DB Config
const db = require('./config/keys').MongoURI;

// Connect To Mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(

    session({

      secret: 'secret',
      resave: true,
      saveUninitialized: true

    })

);

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {

    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
    
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))