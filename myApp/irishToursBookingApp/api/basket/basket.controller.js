var _ = require('lodash');
var basket = require('./basket.model');

// Get list of basket
exports.index = function(req, res) {
          // Connect to the db
   basket.find({"state":"tourAdded"},function (err, basket) {
    if(err) { return handleError(res, err); }
    return res.json(200, basket);
  });
} ;

// Creates a new basket in datastore.
exports.create = function(req, res) {
  basket.create(req.body, function(err, basket) {
    if(err) { return handleError(res, err); }
    return res.json(201, basket);
  });
};

// Updates an existing basket in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  basket.findById(req.params.id, function (err, basket) {
    if (err) { return handleError(res, err); }
    if(!basket) { return res.send(404); }
    var updated = _.merge(basket, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, basket);
    });
  });
};

// delete an existing basket in datastore.
exports.delete = function(req, res) {
    basket.findById(req.params.id, function (err, basket) {
    if(err) { return handleError(res, err); }
    if(!basket) { return res.send(404); }
    basket.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
};