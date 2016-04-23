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


        app.controller('TourListController',  function($scope, SimpleFactory) {
                  $scope.tours = SimpleFactory.getTours()
                  $scope.addBasketItem = function (tour) {
                        SimpleFactory.addBasketItem({
                              tour_name: tour.tour_name, 
                              county: tour.county, 
                              cost: tour.cost, 
                              quantity: tour.quantity,
                              date: tour.date
                            })
                        tour.state = "tourAdded"
                        $scope.newBasketItem = {}
                        }
                  $scope.removeBasketItem = function (tour) {
                      SimpleFactory.removeBasketItem(
                          SimpleFactory.getBasketItemIndex({
                                  tour_name: tour.tour_name, 
                                  county: tour.county, 
                                  cost: tour.cost, 
                                  quantity: tour.quantity,
                                  tour: tour.date
                                })
                          )
                        tour.quantity = ""
                        tour.state = "normal"
                        }
                  })


        app.controller('TourBasketController', function($scope,SimpleFactory) {
                $scope.basket = SimpleFactory.getBasket()
                $scope.newBasketItem = { }
                $scope.removeBasketItem = function (order_item) {
                        SimpleFactory.removeBasketItem(order_item)
                        }
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
                })

app.factory('SimpleFactory', function () {
        var factory = {};
        var basket = [{ order_item: '',
                        tour_name: 'Jameson Whiskey Tour',
                        county: 'Dublin',
                        cost: '25',
                        date: '2016-03-26',
                        quantity: '2'
                        }] 

        var tours = [ 
                        {tour_name: 'Castle Tour',
                        county: 'Kilkenny',
                        cost: '7',
                        duration: '2hours',
                        description: 'kldhjdfljgkldhjdfljgkldhjdfljguuuiuiuy',
                        quantity: '0'
                        },
                        {
                        tour_name: 'Hop On Hop Off Bus Tour',
                        county: 'Dublin',
                        cost: '25',
                        duration: '2hours',
                        description: 'kldhjdfljguuuiuiuy',
                        quantity: '0'
                        },
                        {
                        tour_name: 'Jameson Whiskey Tour',
                        county: 'Dublin',
                        cost: '25',
                        duration: '3hours',
                        description: 'kldhjdfljgkldhjdfljguuuiuiuy',
                        quantity: '2',
                        date: '26/03/2016',
                        state: "tourAdded"
                        },
                        {
                        tour_name: 'Smithwicks Tour',
                        county: 'Kilkenny',
                        cost: '20',
                        duration: '2hours',
                        description: 'kldhjdfljgkldhjdfljgkldhjdfljguuuiuiuy',
                        quantity: '0'
                        },
                        {
                        tour_name: 'Viking Walking Tour',
                        county: 'Waterford',
                        cost: '10',
                        duration: '1hours',
                        description: 'kldhjdfljgkldhjdfljgkldhjdfljgkldhjdfljguuuiuiuy',
                        quantity: '0'
                        }] 

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


    




//old

    app.controller('BookingsController', ['$scope', function($scope, $routeParams ) {
                  $scope.bookings = [
                        {
                        name: 'Contact 1',
                        county: 'Ireland',
                        phone_number: '087-123456',
                        email: 'somebody1@email.com',
                        group_size: '2',
                        tour: 'Waterford City Walk',
                        date: '22nd March 2016',
                        booking_status: 'Pending',
                        comments: 'One walker is under 16 years old'
                        },
                        {
                        name: 'Contact 2',
                        county: 'Sweden',
                        phone_number: '000000000',
                        email: 'somebody2@email.com',
                        group_size: '1',
                        tour: 'The Railway Walk',
                        date:'2nd April 2016',
                        booking_status: 'Pending'},
                        {
                        name: 'Contact 3',
                        county: 'Canada',
                        phone_number: '000000000',
                        email: 'somebody3@email.com',
                        group_size: '15',
                        tour: 'The Nire Valley',
                        date: '22nd September 2016',
                        booking_status: 'Cancelled',
                        state : 'deleted'
                        },
                        {
                        name: 'Contact 4',
                        county: 'England',
                        phone_number: '+4411111111',
                        email: 'somebody4@email.com',
                        group_size: '4',
                        tour: 'Dunmore East Coastal Walk',
                        date:'24th March 2016',
                        booking_status: 'Booking Confirmed',
                        state : 'booked'
                        }
                   ]
                $scope.deleteBooking = function(booking)
                  {
                  booking.booking_status = "Cancelled";
                  booking.state = "deleted";
                  }
                $scope.undoDelete = function(booking) 
                  {
                  booking.booking_status = "Pending";
                  booking.state = "normal";
                  }
                $scope.confirmDelete = function(index) 
                  {
                  if ($scope.bookings[index].state == "deleted") {
                  $scope.bookings.splice(index, 1)}      
                  }
                $scope.amendBooking = function(booking) 
                  {
                  booking.oldName = booking.name;
                  booking.oldcounty = booking.county;
                  booking.oldphone_number = booking.phone_number;
                  booking.oldemail = booking.email;
                  booking.oldgroup_size = booking.group_size;
                  booking.oldtour = booking.tour;
                  booking.olddate = booking.date;
                  booking.oldcomments = booking.booking_status;
                  booking.oldcomments = booking.booking_assistant;
                  booking.oldcomments = booking.comments;
                  booking.state = "amend";
                  }
                $scope.submitBooking = function(booking)
                  {
                  booking.booking_status = "Booking Confirmed";
                  booking.state = "booked";
                  }
                $scope.cancelAmend = function(booking) 
                  {
                  booking.oldName = booking.name;
                  booking.oldcounty = booking.county;
                  booking.oldphone_number = booking.phone_number;
                  booking.oldemail = booking.email;
                  booking.oldgroup_size = booking.group_size;
                  booking.oldtour = booking.walk;
                  booking.olddate = booking.date;
                  booking.oldcomments = booking.booking_status;
                  booking.oldcomments = booking.booking_assistant;
                  booking.oldcomments = booking.comments;
                  booking.state = "normal";
                  }
                $scope.saveBooking = function(booking)
                  {
                  booking.booking_status = "Pending";
                  booking.state = "normal";
                  }
             }])
    




