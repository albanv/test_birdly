angular.module('starter')

.controller('StartCtrl', ['$scope', 'range', function($scope, range) {
    $scope.range = range;
}])

.controller('StopCtrl', ['$scope', '$cordovaGeolocation', 'range', function($scope, $cordovaGeolocation, range) {
    $scope.range = range;

    function toRad(value) {
      var RADIANT_CONSTANT = 0.0174532925199433;
      return (value * RADIANT_CONSTANT);
    }

    function calculateDistance(starting, ending) {
      var KM_RATIO = 6371;
      try {      
        var dLat = toRad(ending.latitude - starting.latitude);
        var dLon = toRad(ending.longitude - starting.longitude);
        var lat1Rad = toRad(starting.latitude);
        var lat2Rad = toRad(ending.latitude);
        
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = KM_RATIO * c;
        return d;
      } catch(e) {
        return -1;
      }
    }

    function setSpeed(coords) {
      var KMS_TO_KMH = 3600;
      if (!prevCoord) {
        prevCoord = coords;
      }
      range.points.push(coords);
      range.distance += calculateDistance(prevCoord, coords);
      if (duration.asSeconds() > 0) {
        range.avg_speed = (range.distance / duration.asSeconds()) * KMS_TO_KMH;
      }
      prevCoord = coords;
    }

    var watchOptions = {
        frequency : 1000,
        timeout : 3000,
        enableHighAccuracy: false // may cause errors if true
    };

    var watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(
        null,
        function(err) {
          // error
        },
        function(position) {
          setSpeed(position);
    });
}])

.controller('MapCtrl', ['$scope', 'range', 'uiGmapGoogleMapApi', function($scope, range, uiGmapGoogleMapApi){
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    
    uiGmapGoogleMapApi.then(function(maps) {
        console.log(maps);

    });
}])