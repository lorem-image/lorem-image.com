'use strict';

var express = require('express');
var controller = require('./image.controller');

var router = express.Router();

var routeParams = {
	id: '/:id([0-9]+)',
	index: '/:index([0-9]+)',
	category: '/:category([a-zA-Z]+)',
	size: '/:width([0-9]+)/:height([0-9]+)',
	color: '/:color([a-zA-Z]+)',
	grayscale: '/:grayscale(g)'
};

router.get('/', controller.index);
router.get(routeParams.id, controller.composeCallback);
router.get(routeParams.category + routeParams.index + '?', controller.composeCallback);
router.get(routeParams.size + routeParams.category + routeParams.index + '?', controller.composeCallback);
router.get(routeParams.color + '?' + routeParams.size + routeParams.category + routeParams.index + '?', controller.composeCallback);
router.get(routeParams.grayscale + routeParams.size + routeParams.category + routeParams.index + '?', controller.composeCallback);

router.post('/', controller.create);
router.put(routeParams.id, controller.update);
router.patch(routeParams.id, controller.update);
router.delete(routeParams.id, controller.destroy);

module.exports = router;