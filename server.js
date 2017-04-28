const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const api = require('./server/api');

// App
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set static path to Angular app in dist
app.use(express.static(path.join(__dirname, 'dist')));

// API routes
app.use('/api', api);

// Send anything else to Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Set port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create server
const server = http.createServer(app);

// Listen
server.listen(port, () => console.log(`API running on localhost:${port}`));
