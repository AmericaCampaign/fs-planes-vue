var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Plane = require('./models/plane');

mongoose.connect("mongodb://localhost/fsplanesVue");

app.set('port', 3001);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/planes', function(req, res) {
  Plane.find(function(err, planes){
    if(err) {
      res.send(err)
    } else {
      res.send({data: planes, message: "Found all planes"})
    }
  })
});

app.post('/api/planes', function(req, res) {
  var newPlane = new Plane({
    type: req.body.type,
    topSpeed: req.body.topSpeed,
    img: req.body.img
  });

  newPlane.save(function(err, plane){
    if(err) {
      res.send(err)
    } else {
      res.send({data: plane, message: "Created plane successfully."})
    }
  })
})

app.get('/api/planes/:plane_id', function(req, res){
  Plane.findById(req.params.plane_id, function(err, plane){
    if(err) {
      res.send(err)
    } else {
      res.send({ data: plane, message: "Plane found" })
    }
  })
})

app.delete('/api/planes/:plane_id', function(req, res){
  Plane.remove({_id: req.params.plane_id}, function(err){
    if(err){
      res.send(err)
    } else {
      res.send({message: "Planed Deleted"})
    }
  })
});

app.put('/api/planes/:plane_id', function(req, res){
  Plane.findById(req.params.plane_id, function(err, plane) {
    if(err) {
      res.send(err)
    } else {
      plane.type = req.body.type ? req.body.type : plane.type;
      plane.topSpeed = req.body.topSpeed ? req.body.topSpeed : plane.topSpeed;
      plane.img = req.body.img ? req.body.img : plane.img;
      plane.save(function(err, updatedPlane){
        if(err){
          res.send(err)
        } else {
          res.send({data: plane, message: 'Plane updated!'})
        }
      })
    }
  })
})

app.listen(app.get('port'), function(){
  console.log('SERVER LISTENING AT PORT 3000')
});

module.exports = app;
