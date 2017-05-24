const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Plane = require('./models/plane'),
  planeRoutes = require('./routes/planes');

mongoose.connect("mongodb://localhost/fsplanesVue");

app.set('port', 3001);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/planes', planeRoutes);

app.listen(app.get('port'),() => {
  console.log('SERVER LISTENING AT PORT 3000')
});

module.exports = app;
