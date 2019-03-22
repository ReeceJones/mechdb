module.exports = {
  jwt: {
    secret: '(4[_2M>(_r=WBLW',
    opts: {
      expiresIn: '1d',
      algorithm: 'HS256',
    },
  },
  db: {
    uri: 'mongodb://db:27017/website',
  },
}
