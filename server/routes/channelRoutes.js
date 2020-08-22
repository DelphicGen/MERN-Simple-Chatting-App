const express = require('express');
const router = express.Router();
const Channel = require('../models/channel');
const User = require('../models/user');

const [checkAuthenticated, checkNotAuthenticated] = require('../functions/functions');

router.get('/list', checkAuthenticated, function(req, res, next) {
    req.user
        .then(async data => {
            const channels = await Promise.all(data.channel_id.map(async (record) => {
                const channel = await Channel.find({ _id: record });
                return channel[0];
            }));
            res.send(channels);
    })
})

router.post('/add', checkAuthenticated, function(req, res, next) {
    if(!req.body.icon) req.body.icon = "comments"
    req.user
        .then(data => {
            Channel.create(req.body)
            .then((channel) => {
                let tempChannel = [...data.channel_id]
                tempChannel.push(channel._id)
                User.findOneAndUpdate({username: data.username}, {channel_id: tempChannel})
                    .then(user => {
                        res.send('Ok')
                    })
                    .catch(err => {
                        res.send(err)
                    })
            })
            .catch((err) => {
                res.send(err)
            });
        })
})

router.get('/message', checkAuthenticated, function(req, res, next) {
    Channel.find({_id: req.query.room})
        .then(channel => {
            res.send(channel[0].chat)
        })
})

router.post('/message', checkAuthenticated, function(req, res, next) {
    Channel.findOne({_id: req.query.room})
        .then(channel => {
            let listOfChat = [...channel.chat]
            listOfChat.push(req.body)
            Channel.findOneAndUpdate({_id: req.query.room}, {chat: listOfChat})
                .then(record => {
                    res.send('Ok')
                })
        })
})

module.exports = router;