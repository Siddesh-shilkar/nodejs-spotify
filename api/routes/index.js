'use strict';
const express = require('express');
const router = express();
const auth = require('./auth');
const search = require('./search')

router.use('/', auth);
router.use('/', search)

module.exports = router;