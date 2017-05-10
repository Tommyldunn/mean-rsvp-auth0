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
 | Authentication Middleware
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

/*
 |--------------------------------------
 | API Routes
 |--------------------------------------
 */

  const _eventListProjection = 'title startDatetime endDatetime location viewPublic';

  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });

  // GET list of public events starting in the future
  app.get('/api/events', (req, res) => {
    Event.find(
      {viewPublic: true, startDatetime: { $gte: new Date() }},
      _eventListProjection,
      (err, events) => {
        let eventsArr = [];
        if (!events) {
          return res.status(400).send({ message: 'No events found.' });
        }
        events.forEach((event) => {
          eventsArr.push(event);
        });
        res.send(eventsArr);
      }
    );
  });

  // GET list of all events, public and private (admin only)
  app.get('/api/events/admin', jwtCheck, adminCheck, (req, res) => {
    Event.find(
      {},
      _eventListProjection,
      (err, events) => {
        let eventsArr = [];
        if (!events) {
          return res.status(400).send({ message: 'No events found.' });
        }
        events.forEach((event) => {
          eventsArr.push(event);
        });
        res.send(eventsArr);
      }
    );
  });

  // GET event details (with RSVPs)
  app.get('/api/event/:id', jwtCheck, (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) { res.send(err); }

      // Add associated RSVPs to event data
      Rsvp.find({eventId: req.params.id}, (err, rsvps) => {
        let rsvpsArr = [];
        if (rsvps) {
          rsvps.forEach((rsvp) => {
            rsvpsArr.push(rsvp);
          });
          event.rsvps = rsvpsArr;
        }
        res.send(event);
      });
    });
  });

  // GET list of a user's RSVPs
  app.get('/api/rsvps/:userId', jwtCheck, (req, res) => {
    Rsvp.find({userId: req.params.userId}, (err, rsvps) => {
      let rsvpsArr = [];
      if (!rsvps) {
        return res.status(400).send({ message: 'No RSVPs found.' });
      }
      rsvps.forEach((rsvp) => {
        rsvpsArr.push(rsvp);
      });
      res.send(rsvpsArr);
    });
  });

  // POST a new event
  app.post('/api/event/new', jwtCheck, adminCheck, (req, res) => {
    Event.findOne({title: req.body.title, location: req.body.location}, (err, existingEvent) => {
      if (existingEvent) {
        return res.status(409).send({message: 'You have already created an event with this title at this location.'});
      }
      const event = new Event({
        title: req.body.title,
        location: req.body.location,
        startDatetime: req.body.startDatetime,
        endDatetime: req.body.endDatetime,
        description: req.body.description,
        viewPublic: req.body.viewPublic
      });
      event.save((err) => {
        if (err) {
          res.status(500).send({message: err});
        }
        res.send(event);
      });
    });
  });

  // PUT (edit) an existing event
  app.put('/api/event/:id', jwtCheck, adminCheck, (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (!event) {
        return res.status(400).send({message: 'Event not found.'});
      }
      event.title = req.body.title || event.title;
      event.location = req.body.location || event.location;
      event.startDatetime = req.body.startDatetime || event.startDatetime;
      event.endDatetime = req.body.endDatetime || event.endDatetime;
      event.viewPublic = req.body.viewPublic; // viewPublic can be false, so it must come from req
      event.description = req.body.description || '';

      event.save(err => {
        if (err) {
          res.status(500).send({message: err});
        }
        res.send(event);
      });
    });
  });

  // DELETE an event and all associated RSVPs
  app.delete('/api/event/:id', jwtCheck, adminCheck, (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (!event) {
        return res.status(400).send({message: 'Event not found.'});
      }
      Rsvp.find({eventId: req.params.id}, (err, rsvps) => {
        if (rsvps) {
          rsvps.forEach((rsvp) => {
            rsvp.remove();
          });
        }
        event.remove(err => {
          res.status(200).end();
        });
      });
    });
  });

  // POST a new RSVP
  app.post('/api/rsvp/new', jwtCheck, (req, res) => {
    Rsvp.findOne({eventId: req.body.eventId, userId: req.body.userId}, (err, existingRsvp) => {
      if (existingRsvp) {
        return res.status(409).send({message: 'You have already RSVPed to this event.'});
      }
      const rsvp = new Rsvp({
        userId: req.body.userId,
        name: req.body.name,
        eventId: req.body.eventId,
        attending: req.body.attending,
        guests: req.body.guests,
        comments: req.body.comments
      });
      rsvp.save((err) => {
        if (err) {
          res.status(500).send({message: err});
        }
        res.send(rsvp);
      });
    });
  });

  // PUT (edit) an existing RSVP
  app.put('/api/rsvp/:id', jwtCheck, (req, res) => {
    Rsvp.findById(req.params.id, (err, rsvp) => {
      if (!rsvp) {
        return res.status(400).send({message: 'RSVP not found.'});
      }
      if (rsvp.userId !== req.user.sub) {
        return res.status(401).send({message: 'You cannot edit someone else\'s RSVP.'});
      }
      rsvp.userId = req.body.userId || rsvp.userId;
      rsvp.name = req.body.name || rsvp.name;
      rsvp.eventId = rsvp.eventId; // user cannot change the event ID
      rsvp.attending = req.body.attending; // attending can be false, so it must come from req
      rsvp.guests = req.body.guests; // guests can be falsey, so it must come from req
      rsvp.comments = req.body.comments || '';

      rsvp.save(err => {
        if (err) {
          res.status(500).send({message: err});
        }
        res.send(rsvp);
      });
    });
  });

};
