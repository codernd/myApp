   var app = angular.module('irishToursBookingApp', ['ngRoute'])

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/Home', {
            templateUrl: './partials/home.html',
            controller: 'HomeController'
          })
           .when('/Tours', {
            templateUrl: './partials/tours.html',
            controller: 'TourListController'
          })
          .when('/TourDetails/:tourId', {
            templateUrl: './partials/tour-detail.html',
            controller: 'TourDetailCtrl'
          })
          .when('/Basket', {
            templateUrl: './partials/basket.html',
            controller: 'TourBasketController'
          })
          .when('/ConfirmBooking', {
            templateUrl: 'partials/confirm_booking.html',
            controller: 'ConfirmBookingCtrl'
          })
          .otherwise({
            redirectTo: '/Home'
          });
    }])

 		app.controller('HomeController',  function($scope, SimpleFactory) {
 				$scope.master = {username: "somebody@email.com"};
     			$scope.reset = function() {
        		$scope.user = angular.copy($scope.master);
    			};
    			$scope.reset();
				});



                  
    app.controller('TourListController',  ['$scope', '$http', function($scope, $http) { 
     $http.get('/api/tours').success(function(tours) {
     $scope.tours = tours;
                  $scope.addBasketItem = function (tour) {
                  $http.put('/api/tours/' + tour._id, tour)
                  .success(function(tourAdded) {
                  tour.state = "tourAdded";
                  });}

                  $scope.removeBasketItem = function (tour) {
                  $http.put('/api/tours/' + tour._id, tour)
                  .success(function() {
                  tour.quantity = 0,
                  tour.date = null,
                  tour.state = "normal";
                  });}

                 
    })}])




app.controller('TourBasketController',  ['$scope', '$http', function($scope, $http) { 
      $http.get('/api/tours').success(function(basket) {
      $scope.basket = basket   //add in selection criteria to return those that have {"state" : "tourAdded"}
      });
      
                $scope.newBasketItem = { }
                
                $scope.removeBasketItem = function (index) {
                  //$http.put('/api/tours/' + tour._id, tour)
                $http.delete('/api/contacts/' + $scope.basket[index]._id)
                .success(function() {
                $scope.basket.basket_item.splice(index, 1) 
                });}
                  
                
                $scope.total = function() {
                        var total = 0; 
                        angular.forEach($scope.basket, function(item) {
                            total += item.quantity * item.cost;
                        })
                        return total;
                        }
                $scope.confirmBooking = function(){
                        basket.state = "bookingConfirmed"
                        }
               // })
    }])

 

app.controller('ConfirmBookingCtrl', ['$scope', '$http', function( $scope, $routeParams, $http) {
      $http.add_booking_detail('/api/tours', booking).success(function(booking) {
      $scope.booking = booking;
    });

        $scope.addBookingDetail = function(booking)
      {
        booking.push
          ({
          firstName: booking.firstName,
          lastName: booking.lastName,
          email : booking.email,
          telephone: booking.telephone,
          bankDetails: booking.bankNumber
          })
      $scope.newBookingDetails = {} 
        }
  }])



//app.factory('SimpleFactory', ['$http', function($http){
app.factory('SimpleFactory', function () {



        factory.getBasket = function () {
            return basket;
        }

        factory.getTours = function () {
            return tours;
        }

        factory.addBasketItem = function(basketItem) {
             basket.push({
                              tour_name: basketItem.tour_name, 
                              county: basketItem.county, 
                              cost: basketItem.cost, 
                              quantity: basketItem.quantity,
                              date: basketItem.date
                            }) 
           return undefined
        }

        factory.removeBasketItem = function(index) {
              basket.splice(index, 1)
        }

      factory.getBasketItemIndex = function (basketItem) {
            if (basket.tour_name = basketItem.tour_name ) {
               return basket.order_item
           }
           return undefined
        }

        factory.updateBasket = function(index,basketItem) {
             basket[index].order_item = basketItem.order_item
             basket[index].tour_name = basketItem.tour_name
             basket[index].county = basketItem.county
             basket[index].cost = basketItem.cost
             basket[index].quantity = basketItem.quantity
             basket[index].date = basketItem.date
        }
        return factory;
    })


app.controller('ConfirmBookingCtrl', ['$scope',
    function( $scope, $routeParams) {
        $scope.booking = {};
      $scope.addBookingDetail = function()
      {
        $scope.basket.push
          ({
          firstName: $scope.newBookingDetails.firstName,
          lastName: $scope.newBookingDetails.lastName,
          email : $scope.newBookingDetails.email,
          telephone: $scope.newBookingDetails.telephone,
          bankDetails: $scope.newBookingDetails.bankNumber
          })
      $scope.newBookingDetails = {} 
        }
  }])


    


