/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

// Modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// Config
const config = require('./server/config');

/*
 |--------------------------------------
 | MongoDB
 |--------------------------------------
 */

mongoose.connect(config.MONGO_URI);
const monDb = mongoose.connection;

monDb.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that', config.MONGO_URI, 'is running.');
});

monDb.once('open', function callback() {
  console.info('Connected to MongoDB:', config.MONGO_URI);
});

/*
 |--------------------------------------
 | App
 |--------------------------------------
 */

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));

// Set port
const port = process.env.PORT || '3000';
app.set('port', port);

// Set static path to Angular app in dist
app.use(express.static(path.join(__dirname, './dist')));

/*
 |--------------------------------------
 | Routes
 |--------------------------------------
 */

require('./server/api')(app, config);

// Pass routing to Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/*
 |--------------------------------------
 | Server
 |--------------------------------------
 */

app.listen(port, () => console.log(`App running on localhost:${port}`));
