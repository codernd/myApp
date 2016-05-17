'use strict';
var mongoose = require('mongoose')
var Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

	var basketSchema = new Schema({
	  tour_name: String,
	  county: String,
	  cost: String,
	  quantity: { type: Number, min: 0, max: 100, required: true  },
	  date: { type: String, required: true }//, default: Date.now }
	});

	var bookingSchema = new Schema({
		firstName: String,
         lastName: String,
         email : String,
         telephone: Number,
         bankDetails: Number
	});

	var tourSchema = new Schema({
	  tour_name: String,
	  county: String,
	  cost: String,
	  duration: String,
	  description: String,
	  quantity: { type: Number, min: 0, max: 100 },
	  date: { type: String},//, default: Date.now },
	  state: String,
	  basket_item: [basketSchema] ,
	  booking_detail: [bookingSchema]
	});



//module.exports = mongoose.model('basket', basketSchema);

module.exports = mongoose.model('tours', tourSchema);


