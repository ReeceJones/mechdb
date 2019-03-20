const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

const db = require('../lib/db')

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  username: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
  },
  passwordToken: {
    type: Sequelize.STRING,
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['username'],
    },
    {
      unique: true,
      fields: ['email'],
    },
  ],
})

User.prototype.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// hash password, and set its value in the user field
function hashPassword (user, options) {
  if (!user.changed('password')) return
  return bcrypt
    .hash(user.password, 10)
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)

module.exports = User
