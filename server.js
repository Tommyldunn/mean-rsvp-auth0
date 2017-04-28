// Module dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// Config
const config = require('./server/config');

// App
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));

// Set static path to Angular app in dist
app.use(express.static(path.join(__dirname, './dist')));

// API routes
require('./server/api')(app, config);

// Pass routing to Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Set port
const port = process.env.PORT || '3000';
app.set('port', port);

// Listen
app.listen(port, () => console.log(`API running on localhost:${port}`));
