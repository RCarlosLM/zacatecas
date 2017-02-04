
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'angularMoment', 'ngCordova'])

.run(function($ionicPlatform, $http, $rootScope) {
  $ionicPlatform.ready(function() {


    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    console.log(FileTransfer);
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    $rootScope.sector = null;

    $http.get("http://192.168.0.104/generar.php") 
    .success(function(data) {
//inicio de prueba spinner
        
//fin de prueba spinner
      var a = JSON.stringify(data);
      var b = JSON.parse(a);
      sector = b;

      $rootScope.sector = b; 
      
      //alert(JSON.stringify(sector));
      console.log("ready");
      //alert(JSON.stringify(sector));

    })
    .error(function (data, status, headers, config) { 
      //alert("ERROR:"+JSON.stringify(data));
    });


  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive

  $stateProvider

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'registros'
      })

      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

  // Each tab has its own nav history stack:

  .state('tab.tab-acercade', {
    url: '/acercade',
    views: {
      'tab-acercade': {
        templateUrl: 'templates/tab-acercade.html',
        controller: 'AcercaCtrl'
      }
    }
  })

  .state('tab.tab-sectores', {
    url: '/sectores',
    views: {
      'tab-sectores': {
        templateUrl: 'templates/tab-sectores.html',
        controller: 'SectoresCtrl'
      }
    }
  })
  .state('tab.sector-detalle', {
    url: '/sectores/:sId',
    views: {
      'tab-sectores': {
        templateUrl: 'templates/sector-detalle.html',
        controller: 'SectorDetalleCtrl'
      }
    }
  })

  .state('tab.tab-sitios', {
    url: '/sitios',
    views: {
      'tab-sitios': {
        templateUrl: 'templates/tab-sitios.html',
        controller: 'SitiosCtrl'
      }
    }
  })

  .state('sitioMexico', {
        url: '/sitioMexico',
        templateUrl: 'templates/sitioMexico.html',
        controller: 'SitiosCtrl'
      });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
