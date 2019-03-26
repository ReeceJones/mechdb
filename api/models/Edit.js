const _ = require('lodash')
const mongoose = require('mongoose')

const models = {
  Keyboard: require('./Keyboard'),
  Keycap: require('./Keycap'),
  Manufacturer: require('./Manufacturer'),
  Switch: require('./Switch'),
  Vendor: require('./Vendor'),
}
const schema = new mongoose.Schema({
  instanceModel: {
    type: String,
    required: true,
  },
  instanceId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  type: {
    type: String,
    enum: ['add', 'edit', 'delete'],
  },
  before: {
    type: Object,
  },
  after: {
    type: Object,
  },
  status: {
    type: String,
    enum: ['new', 'approved', 'rejected'],
    default: 'new',
  },
  approvedAt: {
    type: Date,
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  rejectedAt: {
    type: Date,
  },
  rejectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
})

schema.pre('save', async function () {
  if (!this.isNew) return

  const Model = this.getModel()
  if (!Model) return

  const data = await Model.findById(this.instanceId)
  if (!data) return

  // edition
  if (this.type === 'edit') {
    this.before = {}
    _.each(this.after, (value, key) => {
      this.before[key] = data[key]
    })
  }

  // deletion
  if (this.type === 'delete') {
    this.before = data
  }
})

schema.methods.apply = async function () {
  const Model = this.getModel()
  if (!Model) return

  // addition
  if (this.type === 'add') {
    try {
      const doc = new Model(this.after)
      await doc.save()
      this.instanceId = doc._id
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

    _.each(this.after, (value, key) => {
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
      await Model.findByIdAndRemove(this.instanceId)
      return true
    } catch (e) {
      console.error('Edit apply (deletion) failed with error', e)
      return false
    }
  }

  return false
}

schema.methods.approve = async function (userId) {
  const applied = await this.apply()
  if (!applied) return

  this.status = 'approved'
  this.approvedBy = userId
  this.approvedAt = new Date()

  await this.save()
}

schema.methods.getModel = function () {
  if (models[this.instanceModel] === undefined) return null
  return models[this.instanceModel]
}

schema.methods.getInstance = async function () {
  const Model = this.getModel()
  if (!Model) return

  if (!this.instanceId) {
    return null
  }

  return Model.findById(this.instanceId)
}

module.exports = mongoose.model('Edit', schema)
