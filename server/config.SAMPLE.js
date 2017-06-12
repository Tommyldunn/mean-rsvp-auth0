module.exports = {
  AUTH0_DOMAIN: '<your_auth0_domain>.auth0.com',
  AUTH0_API_AUDIENCE: '<your_Auth0_API_audience>' /* 'http://localhost:8083/api/' */,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://<user>:<password>@<ds111111>.mlab.com:<port>/<db_name>',
  NAMESPACE: '<your_auth_roles_rule_namespace>' /* likely http://myapp.com/roles */
};
