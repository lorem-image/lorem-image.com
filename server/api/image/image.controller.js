'use strict';

var _ = require('lodash');
var Image = require('./image.model');


var imageCallback = function(req, res, status) {
  return function(err, image) {
    if(err) { 
      return handleError(res, err);
    }
    
    if(!image) {
      return res.status(404).end();
    }
    
    var result = image,  
        actions = {};

    'grayscale width height'.split(' ').forEach(function(paramName, i) {
      // console.log(paramName,req.param(paramName));
      if(req.param(paramName)) {
        actions[paramName] = req.param(paramName);
      }
    });

    result.actions = actions;

    // console.log(result);

    return res.status(status || 200).json(result);
  };
};

// Get list of images
exports.index = function(req, res) {
  var cursor = Image.find();

  return normalSort(cursor).exec(imageCallback(req, res));
};

// Get a single image
exports.show = function(req, res) {
  Image.findById(req.params.id, imageCallback(req, res));
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

    updated.save(imageCallback(req, res));
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
      cursor = Image.find({category: category});

  if(!index) {
    cursor = random(cursor);
  } else {
    cursor = cursor.skip(index - 1).limit(1).findOne();
  }

  return cursor.exec(imageCallback(req, res));
};


exports.composeCallback = function(req, res) {
  var params = req.params,
      cursor = new CursorOperation().all();

  'color category'.split(' ').forEach(function(paramName, i) {
    if(req.param(paramName)) {
      cursor[paramName](req.param(paramName));
    }
  });

  if(req.param('index')) {
    cursor.index(req.param('index'));
  } else {
    cursor.random();
  }


  // use .lean() for making mongoose return plaing objects instead of full model instances 
  return cursor._getCursor().lean().exec(imageCallback(req, res));
}

var cursorOperations = {
  _getCursor: function() {
    return this._cursor;
  },

  all: function() {
    this._cursor = Image.find({});
    return this;
  },

  id: function(id) {
    this._getCursor().cursor.findById(id);
    return this;
  },

  category: function(category) {
    this._getCursor().find({category: category});
    return this;
  },

  color: function(color) {
    this._getCursor().find({color: color});
    return this;
  },

  index: function(index) {
    this._getCursor().skip(index - 1).limit(1).findOne();
    return this;
  },

  random: function(){
    var rand = Math.random(),
        cursor = this._getCursor(),
        result = cursor.findOne({random: {$gte: rand}});

    if (!result) {
      cursor.findOne({random: {$lte: rand}});
    }

    return this;
  }
};

function CursorOperation(cursor) {
  this.cursor = cursor || null;
}
CursorOperation.prototype = cursorOperations;

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