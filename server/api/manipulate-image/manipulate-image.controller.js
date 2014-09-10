'use strict';

var getJSON = require('get-json');
var path = require('path');
var appDir = path.dirname(require.main.filename);

var apiEndoint = 'http://localhost:9000/api/v1/images';
var options = {
  root: appDir + '/data/images/',
  dotfiles: 'deny',
  headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
  }
};

function query(req, res) {
  _query(req.path, function(err, response) {
  	res.sendFile(response.src, options, function(err, response) {
  		if(err) {
  			handleError(res, err);
  		}
  	});
  });
}

function _query(query, callback) {
  getJSON(apiEndoint + query, callback);
}

function handleError(res, err) {
  return res.send(500, err);
}

module.exports = query;