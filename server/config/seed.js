/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Image = require('../api/image/image.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Image.find({}).remove(function() {
  Image.create(
  {
    "src": "http://hdwallpapervault.com/wp-content/uploads/2013/06/Red-Fender-Guitar-Wallpaper.jpg",
    "colors": [
      "red",
      "white"
    ],
    "category": [
      "music",
      "art"
    ],
    "random": 0.7375648128800094
  },
  {
    "src": "http://primemag.me/wp-content/uploads/2014/08/modern-art.jpg",
    "colors": [
      "red",
      "blue"
    ],
    "category": [
      "art"
    ],
    "random": 0.5146371680311859
  },
  {
    "src": "http://tudorbolnavu.ro/wp-content/themes/village/blueprint/gallery/ajaxupload/server/uploads/21.jpg",
    "colors": [
      "green",
      "brown"
    ],
    "category": [
      "art"
    ],
    "random": 0.7375648128800094
  },
  {
    "src": "http://tudorbolnavu.ro/wp-content/themes/village/blueprint/gallery/ajaxupload/server/uploads/site.jpg",
    "colors": [
      "green"
    ],
    "category": [
      "nature"
    ],
    "random": 0.09772267867811024
  },
  {
    "src": "http://tudorbolnavu.ro/wp-content/themes/village/blueprint/gallery/ajaxupload/server/uploads/26.jpg",
    "colors": [
      "brown"
    ],
    "category": [
      "art",
      "city"
    ],
    "random": 0.7274456324521452
  },
  {
    "src": "http://tudorbolnavu.ro/wp-content/themes/village/blueprint/gallery/ajaxupload/server/uploads/25.jpg",
    "colors": [
      "green"
    ],
    "category": [
      "nature",
      "animals"
    ],
    "random": 0.5734705831855536
  },
  {
    "src": "http://tudorbolnavu.ro/wp-content/themes/village/blueprint/gallery/ajaxupload/server/uploads/14.jpg",
    "colors": [
      "gray",
      "brown"
    ],
    "category": [
      "nature",
      "art"
    ],
    "random": 0.9608558556064963
  },
  {
    "src": "http://tudorbolnavu.ro/wp-content/themes/village/blueprint/gallery/ajaxupload/server/uploads/8.jpg",
    "colors": [
      "blue",
      "red"
    ],
    "category": [
      "city"
    ],
    "random": 0.6978832732420415
  },
  {
    "src": "http://tudorbolnavu.ro/wp-content/themes/village/blueprint/gallery/ajaxupload/server/uploads/4.jpg",
    "colors": [
      "black",
      "yellow"
    ],
    "category": [
      "city"
    ],
    "random": 0.5556299483869225
  }, function() {
    console.log('finished populating images :D');
  });
});