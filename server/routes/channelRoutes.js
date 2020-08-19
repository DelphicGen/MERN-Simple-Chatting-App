const express = require('express');
const router = express.Router();
const Channel = require('../models/channel');

const [checkAuthenticated, checkNotAuthenticated] = require('../functions/functions');

router.get('/list', checkAuthenticated, function(req, res, next) {
    Channel.find({})
        .then((records) => {
            res.send(records)
        })
        .catch(next);
})

router.post('/add', checkAuthenticated, function(req, res, next) {
    Channel.create(req.body)
        .then(function(record) {
            res.send('Ok')
        })
        .catch(next);
})

module.exports = router;