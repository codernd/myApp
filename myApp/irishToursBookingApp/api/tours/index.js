'use strict';

var express = require('express');
var controller = require('./tours.controller');
//var controller2 = require('./basket.controller');

var router = express.Router();

router.get('/', controller.index);
//router.get('/', controller2.addBasketItems);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.post('/:id/ConfirmBooking', controller.add_booking_detail);

module.exports = router;





