function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.send("Not authenticated")
}

function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        res.send("Is authenticated")
    }
    return next();
}

module.exports = [checkAuthenticated, checkNotAuthenticated]