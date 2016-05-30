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
    db: 'mongodb://heroku_p5cp7djd:bgm9neln51uj3v0pd8iool167v@ds011963.mlab.com:11963/heroku_p5cp7djd',
    options: { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } }
  }
};

module.exports = config[env];
module.exports.secret = 'devdacticIsAwesome';
