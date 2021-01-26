// Imports
const express = require('express');
const router = express.Router();

// Home Page
router.get('/', (req, res) => res.send('Welcome'));

module.exports = router;