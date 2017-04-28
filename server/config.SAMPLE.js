module.exports = {
  AUTH0_DOMAIN: '<your_domain>.auth0.com',
  AUTH0_API_AUDIENCE: 'http://localhost:3000/api',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://<user>:<password>@<ds111111>.mlab.com:<port>/rsvp'
};
