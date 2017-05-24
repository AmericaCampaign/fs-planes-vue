var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/fsplanesVue");

app.set('port', 3001);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test', function(req, res){
  res.json({message: "Server Endpoint Working"})
});

app.listen(app.get('port'), function(){
  console.log('SERVER LISTENING AT PORT 3000')
});

module.exports = app;
