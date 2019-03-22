
const passport = require('passport')
const passportJwt = require('passport-jwt')

const config = require('../config')
const User = require('../models/User')

const opts = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(new passportJwt.Strategy(opts, (jwtPayload, done) => {
  User.findOne({ email: jwtPayload.email })
    .then((doc) => {
      done(null, doc)
    }).catch((err) => done(null, false, { code: 401, message: err }))
}))

const getUser = passport.authenticate('jwt', {
  session: false,
})

module.exports = {
  init: passport.initialize(),
  isLoggedIn: getUser,
  isAdmin: (req, res, next) => {
    getUser(req, res, () => {
      if (!req.user || !req.user.isAdmin) {
        return next('401 Forbidden')
      }
      next()
    })
  },
}
