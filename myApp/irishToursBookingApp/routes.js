module.exports = function(app) {

 app.use('/api/tours', require('./api/tours'));
 //app.use('/api/basket', require('./api/basket'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|app|assets)/*')
   .get(function(req, res) {
    res.send(404);
  })

};
