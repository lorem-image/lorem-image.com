'use strict';

var _ = require('lodash');
var Image = require('./image.model');

// Get list of images
exports.index = function(req, res) {
  // Image.find(function (err, images) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, images);
  // });

  var callback = function (err, images) {
    if(err) { return handleError(res, err); }
    return res.json(200, images);
  };

  var cursor = Image.find();

  return normalSort(cursor).exec(callback);
};

// Get a single image
exports.show = function(req, res) {
  Image.findById(req.params.id, function (err, image) {
    if(err) { return handleError(res, err); }
    if(!image) { return res.send(404); }
    return res.json(image);
  });
};

// Creates a new image in the DB.
exports.create = function(req, res) {
  Image.create(req.body, function(err, image) {
    if(err) { return handleError(res, err); }
    return res.json(201, image);
  });
};

// Updates an existing image in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Image.findById(req.params.id, function (err, image) {
    if (err) { return handleError(err); }
    if(!image) { return res.send(404); }
    var updated = _.merge(image, req.body);
    updated.save(function (err) {
      if (err) { return handleError(err); }
      return res.json(200, image);
    });
  });
};

// Deletes a image from the DB.
exports.destroy = function(req, res) {
  Image.findById(req.params.id, function (err, image) {
    if(err) { return handleError(res, err); }
    if(!image) { return res.send(404); }
    image.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};



// a random a image from a certain category.
exports.category = function(req, res) {
  var category = req.params.category,
      index = req.params.index,
      cursor = Image.find({category: category}),
      callback = function(err, image) {
        if(err) { return handleError(res, err); }
        return res.json(200, image);
      };

  if(!index) {
    cursor = random(cursor);
  } else {
    cursor = cursor.skip(index - 1).limit(1).findOne();
  }

  return cursor.exec(callback);
};

// applies the "normal" sorting toa cursor
function normalSort (cursor) {
  return cursor.sort({ $natural: 1 });
}

// returns a random item from a collection (cursor)
function random(cursor) {
  var rand = Math.random(),
      cmp  = Math.random(),
      result = cursor.findOne({random: {$gte: rand}});

  if (!result) {
    result = cursor.findOne({random: {$lte: rand}});
  }

  return result;
}

function handleError(res, err) {
  return res.send(500, err);
}