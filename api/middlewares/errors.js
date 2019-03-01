module.exports = (err, req, res, next) => {
  let m

  if (!err) {
    return next()
  }

  if (typeof err === 'string' && (m = err.match(/^([0-9]{3})\s+(.*)$/))) {
    res.status(parseInt(m[1]))
    err = m[2]

  } else {
    res.status(500)

    if (typeof err !== 'string') {
      err = err.msg || err
      err = err.response || err
    }
  }

  if (process.NODE_ENV !== 'production') {
    console.log(err)
  }

  res.json({ error: err.toString() })
}
