// Imports
const express = require('express');

// Initialize Express
const app = express();

// Routes
app.use('/', require('./routes/index'));

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))