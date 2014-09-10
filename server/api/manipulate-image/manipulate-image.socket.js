/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ManipulateImage = require('./manipulate-image.model');

exports.register = function(socket) {
  ManipulateImage.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  ManipulateImage.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('manipulate-image:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('manipulate-image:remove', doc);
}