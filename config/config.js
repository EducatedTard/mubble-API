var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'mubble-express'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/mubble-express-development',
    options: { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } }
  },

  test: {
    root: rootPath,
    app: {
      name: 'mubble-express'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/mubble-express-test',
    options: { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } }
  },

  production: {
    root: rootPath,
    app: {
      name: 'mubble-express'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/mubble-express-production',
    options: { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } }
  }
};

module.exports = config[env];
