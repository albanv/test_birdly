// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'uiGmapgoogle-maps'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
  $stateProvider
  .state('start', {
    url: '/',
    controller:  'StartCtrl',
    templateUrl: 'partials/start.html'

  })
  .state('stop', {
    url: '/stop',
    controller:  'StopCtrl',
    templateUrl: 'partials/stop.html'
  })
  .state('maps', {
    url: '/map',
    controller:  'MapCtrl',
    templateUrl: 'partials/map.html'
  });
  $urlRouterProvider.otherwise('/');

  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyBj2RcHMpDpfowYBPqa2EuhneBtcrFF6cc',
    v: '3.17',
    libraries: 'weather,geometry,visualization'
  });
})

.value('range', {
  coef:      0.0,
  distance:  0.0,
  avg_speed: 0.0,
  points:    []
})