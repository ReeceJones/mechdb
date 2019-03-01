
const passport = require('passport')
const passportJwt = require('passport-jwt')

const config = require('../config')
const User = require('../models/User')

const opts = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(new passportJwt.Strategy(opts, (jwtPayload, done) => {
  User.findOne({
    where: { email: jwtPayload.email },
  }).then((doc) => {
    done(null, doc)
  }).error((err) => done(null, false, { code: 401, message: err }))
}))

module.exports = {
  init: passport.initialize(),
  isLoggedIn: (req, res, next) => {
    passport.authenticate('jwt', {
      session: false,
    })(req, res, next)
  },
  isAdmin: (req, res, next) => {
    if (!req.user) {
      return next('401 Unauthorized')
    }
    if (!req.user.isAdmin) {
      return next('403 Forbidden')
    }
    next()
  },
}
