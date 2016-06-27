// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngCordova']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.factory('Weather', function($q, $http) {
  var deferred = $q.defer();
  
  function getCurrentWeather(lat, lng) {
    var url = 'https://api.forecast.io/forecast/119410ea56a75a00c08020574f704e2b/' + lat +',' + lng + '?callback=JSON_CALLBACK';
    $http.jsonp(url)
      .success(deferred.resolve)
      .error(deferred.reject);
      
    return deferred.promisse;
  }
  return {
    getCurrentWeather: getCurrentWeather
  };
});

app.controller('WeatherCtrl', function($scope, $cordovaGeolocation, Weather) {
  $scope.loading = true;
 
            $scope.toCelsius = function(temperature) {
                return ((temperature - 32) / 1.8).toFixed(1);
            };
 
            $cordovaGeolocation
                .getCurrentPosition({
                    timeout: 10000,
                    enableHighAccuracy: false
                })
                .then(function(position) {
                    var lat = position.coords.latitude;
                    var long = position.coords.longitude;
 
                    Weather.getCurrentWeather(lat, long).then(function(data) {
                        $scope.weatherInfo = data;
                        $scope.loading = false;
                    }, function(error) {
                        //TODO Display error message
                    });
                }, function(err) {
                    //TODO Display error message
                });
  
})
