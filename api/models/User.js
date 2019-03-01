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
  name: {
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
}, {
  indexes: [
    {
      unique: true,
      fields: ['name'],
    },
    {
      unique: true,
      fields: ['email'],
    },
  ]
})

User.prototype.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

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
