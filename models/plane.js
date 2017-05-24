const mongoose = require('mongoose');

const PlaneSchema = new mongoose.Schema({
  type: {type: String},
  topSpeed: Number,
  img: String,
});

module.exports = mongoose.model('Plane', PlaneSchema)
