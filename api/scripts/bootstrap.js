const db = require('../lib/db')

require('../models/Brand')
require('../models/Keyboard')
require('../models/Keycap')
require('../models/Manufacturer')
require('../models/Switch')
const User = require('../models/User')

async function run () {
  await db.sync()
  // await db.sync({ force: true })
  await createUsers()
}

async function createUsers () {
  try {
    const admins = [
      {
        name: 'kartsims',
        email: 'kartsims@gmail.com',
        password: '123',
        isAdmin: true,
      },
    ]
    await User.bulkCreate(admins, {
      individualHooks: true,
    })

    console.log('%d admins created', admins.length)
  } catch (e) {
    console.log('Error with admins creation', e)
  }
}

db.authenticate().then(async () => {
  await run()
  process.exit(0)
}).catch(err => {
  console.error('Unable to connect to the database:', err)
})
