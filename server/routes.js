/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/v1/images', require('./api/image'));
  app.use('/api/v1/things', require('./api/thing'));
  app.use('/api/v1/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets|images)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/index.html')
    .get(function(req, res, next) {
      res.sendFile('/index.html', {
        root: app.get('appPath')
      });
    });

  app.get('/:query*', require('./api/manipulate-image'));
};
