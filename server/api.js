/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require('axios');
const Event = require('./models/Event');
const Rsvp = require('./models/Rsvp');

const API = 'https://jsonplaceholder.typicode.com';

/*
 |--------------------------------------
 | Routing
 |--------------------------------------
 */

module.exports = function(app, config) {
  // Authentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
  });

  // Check for an authenticated admin user
  const adminCheck = (req, res, next) => {
    const roles = req.user[`${config.NAMESPACE}`] || [];
    if (roles.indexOf('admin') > -1) {
      next();
    } else {
      res.status(401).send('Not authorized for admin access');
    }
  }

  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });

  // GET sample authorized API route
  app.get('/api/authorized', jwtCheck, (req, res) => {
    res.send('Authorization successful');
  });

  // GET sample authorized API route
  app.get('/api/admin', jwtCheck, adminCheck, (req, res) => {
    res.send('Admin authorization successful');
  });

  // GET all posts
  app.get('/api/posts', (req, res) => {
    // Get posts from the mock api
    // This should ideally be replaced with a service that connects to MongoDB
    axios.get(`${API}/posts`)
      .then(posts => {
        res.status(200).json(posts.data);
      })
      .catch(error => {
        res.status(500).send(error)
      });
  });

};
