const db = require('../lib/db')

const User = require('../models/User')

async function run () {
  await createAdmin()
}

async function createAdmin () {
  try {
    const admin = {
      email: 'kartsims@gmail.com',
      username: 'kartsims',
      isAdmin: true,
    }
    const doc = new User(admin)
    await doc.setPassword('123')
    await doc.save()
    console.log('[%s] Admin created', doc.email)
  } catch (e) {
    console.log('Error with admin creation', e)
  }
}

db.authenticate().then(async () => {
  await run()
  process.exit(0)
}).catch(err => {
  console.error('Unable to connect to the database:', err)
})
