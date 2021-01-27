// Imports
const express = require('express');
const router = express.Router();

// Home Page
router.get('/', (req, res) => res.render('welcome'));
// Dashboard Page
router.get('/dashboard', (req, res) => res.render('dashboard'));

module.exports = router;