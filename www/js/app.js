// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
})
 
.constant('API_ENDPOINT', {
  url: "http://localhost/siakad/public/api/"
  //  For a simulator use: url: 'http://127.0.0.1:8080/api'
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
      url: '/login',
          templateUrl: 'templates/login.html',
		  controller: 'LoginCtrl'
        }
    )
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.materi', {
    url: '/materi/:nim/:token',
    views: {
      'menuContent': {
        templateUrl: 'templates/materi.html',
		controller: 'MateriCtrl'
      }
    }
  })
  .state('app.info', {
      url: '/info/:nim/:token',
      views: {
        'menuContent': {
          templateUrl: 'templates/informasi.html',
		  controller: 'InfoCtrl'
        }
      }
    })
    .state('app.jadwal', {
      url: '/jadwal/:nim/:token',
      views: {
        'menuContent': {
          templateUrl: 'templates/jadwal.html',
          controller: 'JadwalCtrl'
        }
      }
    })
    .state('app.tugas', {
      url: '/tugas/:nim/:token',
      views: {
        'menuContent': {
          templateUrl: 'templates/tugas.html',
          controller: 'TugasCtrl'
        }
      }
    })
    .state('app.nilai', {
      url: '/nilai/:nim/:token',
      views: {
        'menuContent': {
          templateUrl: 'templates/nilai.html',
          controller: 'NilaiCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
