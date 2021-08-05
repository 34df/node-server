const express = require('express');

const outerController = require('./outerController');

const router = express.Router();

const outer = new outerController;

router.get('/', outer.welcome);

module.exports = router;
