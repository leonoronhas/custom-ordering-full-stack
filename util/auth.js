//Middleware Functions for authentication checks.

exports.userLoginCheck = (req, res, next) => {
    if(req.session && req.session.user) {
        next();
    } else {
        res.redirect('/auth/login')
    }
}
