'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var ImageSchema = new Schema({
  src: String,
  category: Array,
  colors: Array,
  random: Number
});


module.exports = mongoose.model('Image', ImageSchema);