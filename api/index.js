const express = require('express')
const bodyParser = require('body-parser')

const db = require('./lib/db')

const app = express()
const NODE_PORT = process.env.NODE_PORT || 3000

const auth = require('./middlewares/auth')

app.use(bodyParser.urlencoded({
  extended: false,
}))
app.use(bodyParser.json({
  type: 'application/json',
  limit: '4096kb',
}))

app.use(require('./middlewares/cors'))
app.use(auth.init)

app.use('/brands', require('./routes/brands'))
app.use('/keyboards', require('./routes/keyboards'))
app.use('/keycaps', require('./routes/keycaps'))
app.use('/manufacturers', require('./routes/manufacturers'))
app.use('/switches', require('./routes/switches'))
app.use('/upload', require('./routes/upload'))
app.use('/users', require('./routes/users'))

app.use(require('./middlewares/errors'))

db.authenticate().then(() => {
  app.listen(NODE_PORT, () => {
    console.log('* API listening on port %s', NODE_PORT)

    app.emit('started')
  })
}).catch(err => {
  console.error('Unable to connect to the database:', err)
})

module.exports = app
