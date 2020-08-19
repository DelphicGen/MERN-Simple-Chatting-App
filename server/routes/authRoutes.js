const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const [checkAuthenticated, checkNotAuthenticated] = require('../functions/functions');

router.get('/checknotauthenticated', checkNotAuthenticated, function(req, res, next) {
    res.send('Ok')
});

router.get('/checkauthenticated', checkAuthenticated, function(req, res, next) {
    res.send('Ok')
});

router.post('/register', checkNotAuthenticated, function(req, res, next) {
    User.findOne({ username: req.body.username })
        .then(async (records) => {
            if(records) {
                res.send('Username is taken')
            } else {
                if(req.body.password.length === 0) res.send('Password field is required')
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                User.create({username: req.body.username, password: hashedPassword})
                    .then((record) => {
                        res.send("Ok");
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            }
        })
});

router.post('/login', checkNotAuthenticated,function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err) }
        if (!user) {
          req.flash('error', info.message);
          return res.send(info)
        }
        req.login(user, function(err) {
            if (err) { return next(err); }
            return res.send(info)
        });
      })(req, res, next);
});

router.delete('/logout', (req, res) => {
    req.logOut();
    res.send('Ok');
});

module.exports = router;