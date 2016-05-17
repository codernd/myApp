'use strict';
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var basketSchema = new Schema({
	  order_item: String,
	  tour_name: String,
	  county: String,
	  cost: String,
	  tour_date: { type: Date, default: Date.now },
	  quantity: { type: Number, min: 0, max: 100 }
	});

module.exports = mongoose.model('basket', basketSchema);

