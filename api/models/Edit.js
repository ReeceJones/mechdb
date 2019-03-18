const _ = require('lodash')
const Sequelize = require('sequelize')

const db = require('../lib/db')
const User = require('./User')

const models = {
  Brand: require('./Brand'),
  Keyboard: require('./Keyboard'),
  Keycap: require('./Keycap'),
  Manufacturer: require('./Manufacturer'),
  Switch: require('./Switch'),
}

const Edit = db.define('edit', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  modelName: {
    type: Sequelize.STRING,
    required: true,
  },
  instanceId: {
    type: Sequelize.INTEGER,
  },
  type: {
    type: Sequelize.ENUM,
    values: ['add', 'edit', 'delete'],
  },
  before: {
    type: Sequelize.TEXT,
    required: true,
  },
  after: {
    type: Sequelize.TEXT,
    required: true,
  },
  status: {
    type: Sequelize.ENUM,
    values: ['new', 'approved', 'rejected'],
    defaultValue: 'new',
  },
  approvedAt: {
    type: Sequelize.DATE,
  },
  rejectedAt: {
    type: Sequelize.DATE,
  },
})

Edit.belongsTo(User, { as: 'approvedBy' })
Edit.belongsTo(User, { as: 'rejectedBy' })
Edit.belongsTo(User, { as: 'createdBy' })

// beforeCreate an edition
Edit.addHook('beforeCreate', async (doc) => {
  if (doc.type !== 'edit') return

  if (models[doc.modelName] === undefined) return
  const model = models[doc.modelName]

  const instance = await model.findById(doc.instanceId)
  if (!instance) return

  doc.before = {}

  const data = instance.get({ plain: true })
  doc.after = JSON.parse(doc.after)
  _.each(doc.after, (value, key) => {
    if (key === 'photos') {
      value = JSON.stringify(value)
    }
    if (value === data[key]) {
      delete doc.after[key]
      return
    }
    doc.before[key] = data[key]
  })
  doc.before = JSON.stringify(doc.before)
  doc.after = JSON.stringify(doc.after)
})

// beforeCreate a deletion
Edit.addHook('beforeCreate', async (doc) => {
  if (doc.type !== 'delete') return

  if (models[doc.modelName] === undefined) return
  const model = models[doc.modelName]

  const instance = await model.findById(doc.instanceId)
  if (!instance) return

  doc.before = instance.get({ plain: true })
  doc.before = JSON.stringify(doc.before)
})

Edit.prototype.apply = async function () {
  const model = this.getModel()
  if (!model) return

  // addition
  if (this.type === 'add') {
    try {
      await model.create(JSON.parse(this.after))
      return true
    } catch (e) {
      console.error('Edit apply (addition) failed with error', e)
      return false
    }
  }

  if (!this.instanceId) return false

  // edition
  if (this.type === 'edit') {
    const instance = await this.getInstance()
    if (!instance) return false

    const data = JSON.parse(this.after)
    _.each(data, (value, key) => {
      instance[key] = value
    })

    try {
      await instance.save()
      return true
    } catch (e) {
      console.error('Edit apply (edition) failed with error', e)
      return false
    }
  }

  // deletion
  if (this.type === 'delete') {
    try {
      await model.destroy({
        where: { id: this.instanceId },
      })
      return true
    } catch (e) {
      console.error('Edit apply (deletion) failed with error', e)
      return false
    }
  }

  return false
}

Edit.prototype.approve = async function (userId) {

  const applied = await this.apply()
  if (!applied) return

  this.status = 'approved'
  this.approvedById = userId
  this.approvedAt = new Date()

  await this.save()
}

Edit.prototype.getModel = function () {
  if (models[this.modelName] === undefined) return null
  return models[this.modelName]
}

Edit.prototype.getInstance = async function () {
  const model = this.getModel()
  if (!model) return

  if (!this.instanceId) {
    return null
  }

  return model.findById(this.instanceId)
}

module.exports = Edit
