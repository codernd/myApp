var _ = require('lodash');
var tour = require('./tour.model');

// Get list of tours
exports.index = function(req, res) {
          // Connect to the db
   tour.find(function (err, tour) {
    if(err) { return handleError(res, err); }
    return res.json(200, tour);
  });
} ;


// Creates a new tour in datastore.
exports.create = function(req, res) {
  tour.create(req.body, function(err, tour) {
    if(err) { return handleError(res, err); }
    return res.json(201, tour);
  });
};

// Updates an existing tour in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  tour.findById(req.params.id, function (err, tour) {
    if (err) { return handleError(res, err); }
    if(!tour) { return res.send(404); }
    var updated = _.merge(tour, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, tour);
    });
  });
};

// delete an existing tour in datastore. Note I don't want to delete tours.
exports.delete = function(req, res) {
    tour.findById(req.params.id, function (err, tour) {
    if(err) { return handleError(res, err); }
    if(!tour) { return res.send(404); }
    tour.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
};


exports.add_booking_detail = function(req, res) {
     Post.findById(req.params.id, function (err, tour) {
            var booking_detail = {
                firstName: req.body.firstName,
                lastName: req.body.lastName ,
                email: req.body.email ,
                telephone: req.body.telephone ,
                bankDetails: req.body.bankDetails 
             }

            post.booking_detail.push(booking_detail)
            tour.save(function (err) {
              if(err) { return handleError(res, err); }
              var last = _.last(tour.booking_detail)
              if (last != undefined) {
                 return res.json(200, last);
              } else {
                return res.send(500,"Database error")
                 }
            });
      });
  };



