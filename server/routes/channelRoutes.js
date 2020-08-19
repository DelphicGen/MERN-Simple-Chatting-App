const express = require('express');
const router = express.Router();
const Channel = require('../models/channel');

const [checkAuthenticated, checkNotAuthenticated] = require('../functions/functions');

router.get('/list', checkAuthenticated, function(req, res, next) {
    Channel.find({})
        .then((records) => {
            res.send(records)
        })
})

module.exports = router;