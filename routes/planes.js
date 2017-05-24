const express = require('express');
const Router = express.Router();
const Plane = require('../models/plane');

Router.route('/')
  .get((req, res) => {
    Plane.find((err, planes) => {
      if(err) res.send(err);
        res.send({data: planes, message: "Found all planes"})
    })
  })
  .post((req, res) => {
    var newPlane = new Plane({
      type: req.body.type,
      topSpeed: req.body.topSpeed,
      img: req.body.img
    });
    newPlane.save((err, plane) => {
      if(err) res.send(err);
        res.send({data: plane, message: "Created plane successfully."})
    })
  });

Router.route('/:plane_id')
  .get((req, res) => {
    Plane.findById(req.params.plane_id,(err, plane) => {
      if(err) res.send(err);
        res.send({ data: plane, message: "Plane found" })
    })
  })
  .delete((req, res) => {
    Plane.remove({_id: req.params.plane_id},(err) => {
      if(err) res.send(err);
        res.send({message: "Planed Deleted"})
    })
  })
  .put((req, res) => {
    Plane.findById(req.params.plane_id,(err, plane) => {
      if(err) res.send(err);
      plane.type = req.body.type ? req.body.type : plane.type;
      plane.topSpeed = req.body.topSpeed ? req.body.topSpeed : plane.topSpeed;
      plane.img = req.body.img ? req.body.img : plane.img;
        plane.save((err, updatedPlane) => {
          if(err) res.send(err);
            res.send({data: plane, message: 'Plane updated!'})
        })
      })
  })




module.exports = Router
