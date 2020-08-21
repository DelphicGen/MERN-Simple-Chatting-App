const express = require('express');
const router = express.Router();
const Channel = require('../models/channel');
const UserChannel = require('../models/users_channels');

const [checkAuthenticated, checkNotAuthenticated] = require('../functions/functions');

router.get('/list', checkAuthenticated, function(req, res, next) {
        req.user
            .then(data => {
                UserChannel.find({username: data.username})
                    .then((records) => {
                        return Promise.all(records.map(record => {
                            return Channel.find({_id: record.channel_id})
                                .then((channel) => {
                                    return channel[0]
                                })
                        }))
                    })
                    .then(results => {
                        res.send(results)
                    })
                    .catch((err) => {
                        res.send(err)
                    });
            })
})

router.post('/add', checkAuthenticated, function(req, res, next) {
    if(!req.body.icon) req.body.icon = "comments"
    req.user
        .then(data => {
            Channel.create(req.body)
            .then((record) => {
                UserChannel.create({
                    username: data.username,
                    channel_id: record._id
                })
                    .then((record) => {
                        res.send('Ok')
                    })
                    .catch((err) => {
                        res.send(err)
                    })
            })
            .catch((err) => {
                res.send(err)
            });
        })
})

module.exports = router;