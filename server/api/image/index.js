'use strict';

var express = require('express');
var controller = require('./image.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id([0-9]+)', controller.show);
router.get('/:category([a-zA-Z]+)/:index?', controller.category);
router.post('/', controller.create);
router.put('/:id([0-9]+)', controller.update);
router.patch('/:id([0-9]+)', controller.update);
router.delete('/:id([0-9]+)', controller.destroy);

module.exports = router;