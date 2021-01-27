// Imports
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Home Page
router.get('/', (req, res) => res.render('welcome'));
// Dashboard Page
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard'));

module.exports = router;