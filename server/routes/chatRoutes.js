const express = require('express');
const router = express.Router();

const [checkAuthenticated, checkNotAuthenticated] = require('../functions/functions');

// router.get('/room/:id', checkAuthenticated, function(req, res, next) {
//     req.user
//         .then(data => {
//             UserChannel.find({username: data.username})
//                 .then((records) => {
//                     console.log(records)
//                     // return Promise.all(records.map(record => {
//                     //     return Channel.find({_id: record.channel_id})
//                     //         .then((channel) => {
//                     //             return channel[0]
//                     //         })
//                     // }))
//                 })
//                 .then(results => {
//                     res.send(results)
//                 })
//                 .catch((err) => {
//                     res.send(err)
//                 });
//         })
// })

module.exports = router;