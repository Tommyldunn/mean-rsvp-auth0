/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require('axios');

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

  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });

  // GET sample authorized API route
  app.get('/api/authorized', jwtCheck, (req, res) => {
    res.send('Authorization successful');
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
