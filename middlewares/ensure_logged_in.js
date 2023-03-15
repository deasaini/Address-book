function ensureLoggedIn(req, res, next) {
    if (req.session.userId) {
      return next()
    }
  
    //res.redirect("/login")
    res.redirect("/")
  }
  
  module.exports = ensureLoggedIn