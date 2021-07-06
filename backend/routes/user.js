const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// Déclaration des routes liées aux utilisateurs (inscription et connection)

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;