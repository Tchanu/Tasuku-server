const jwt = require('jsonwebtoken')
const randtoken = require('rand-token')

const config = require('./config')

let refreshTokens = {}

// Verify Token
module.exports.verify = function (req, res, next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token']

  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.json({ message: 'Failed to authenticate token.' })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(403).send({
      message: 'No token provided.'
    })
  }
}

// Verify refresh token
module.exports.refreshToken = function (req, res) {
  let refreshToken = req.body.refreshToken || req.query.refreshToken || req.headers['x-refresh-token']

  if (refreshToken && (refreshToken in refreshTokens)) {
    try {
      let _refreshToken = refreshTokens[refreshToken]
      // Check refresh token expiration
      if ((new Date(_refreshToken.expire)).getTime() > (new Date()).getTime()) {
        // TODO generate new access token here
        return res.send(module.exports.generate(_refreshToken.payload))
      }
    } catch (err) {
      throw err
    }
  }

  return res.json({ message: 'Failed to authenticate token.' })
}

// Generate new access and refresh tokens
module.exports.generate = function (payload, refreshToken) {
  let token = jwt.sign(payload, config.secret, {
    expiresIn: config.access_token_expire
  })

  if (!refreshToken) {
    let refreshTokenDate = new Date()
    refreshToken = randtoken.uid(256)

    refreshTokenDate.setDate(refreshTokenDate.getDate() + config.refresh_token_expire)
    refreshTokens[refreshToken] = {
      payload: payload,
      expire: refreshTokenDate
    }
  }

  return {
    token: token,
    refreshToken: refreshToken
  }
}
