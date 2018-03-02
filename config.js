const config = {
  production: {
    port: 3007,
    db_uri: 'mongodb://tasuku:ju4yfh68d52ofj@localhost:27015/tasukudb',
    secret: 'dnjn23lo4nl41k2jnb3hb',
    access_token_expire: 86400, // Access Token expire in seconds
    refresh_token_expire: 7 // Refresh Token expire in days
  },
  default: {
    port: 3007,
    db_uri: 'mongodb://@localhost:27017/tasuku',
    secret: 'there is no secret',
    access_token_expire: 86400, // Access Token expire in seconds
    refresh_token_expire: 7 // Refresh Token expire in days
  }
}

module.exports = config[process.env.NODE_ENV || 'default']
