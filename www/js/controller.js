angular.module('starter')

.controller('StartCtrl', ['$scope', 'range', function($scope, range) {
    $scope.range = range;
}])

.controller('StopCtrl', ['$scope', 'range', function($scope, $cordovaGeolocation, range) {
    $scope.range = range;

    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
        var lat  = position.coords.latitude
        var long = position.coords.longitude
    }, function(err) {
      // error
    });
}])