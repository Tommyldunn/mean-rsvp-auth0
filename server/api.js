/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const Event = require('./models/Event');
const Rsvp = require('./models/Rsvp');

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

  // GET all public events
  app.get('/api/events', (req, res) => {
    Event.find({public: true}, (err, events) => {
      let eventsArr = [];
      if (!events) {
        return res.status(400).send({ message: 'No events found.' });
      }
      events.forEach((event) => {
        eventsArr.push(event);
      });
      res.send(eventsArr);
    });
  });

  // GET sample authorized API route
  app.get('/api/authorized', jwtCheck, (req, res) => {
    res.send('Authorization successful');
  });

  // GET sample authorized API route
  app.get('/api/admin', jwtCheck, adminCheck, (req, res) => {
    res.send('Admin authorization successful');
  });

};
