angular.module('starter.controllers', [])

.controller('AcercaCtrl', function($scope) {
 
 })

.filter('trustAsResourceUrl',['$sce', function($sce) {
  return function (val) {
    return $sce.trustAsResourceUrl(val);
  };
}])

.controller('registros', function($scope, $ionicModal, $timeout, $http, $location, $window, $state, $ionicLoading){
  $ionicLoading.show({
    template: '<ion-spinner icon="lines"></ion-spinner <br/> Cargando',
    duration: 7000
  });
  //declaracion de variables inicializandolas como arreglos
  $scope.registros = {};
  $scope.user = {};

  $scope.registrar = function(){  
    $http.post("http://192.168.0.104/pruebaabiertos.php",$scope.user)
    .then( 
      function(data){
        console.log(data);

        alert("Registrado Correctamente")

        $state.go('tab.tab-acercade');
      },  
      function(){
        alert("error");
      }      
      )
  };

  $scope.skip = function(){
                            $state.go('tab.tab-acercade');
                          }  

})

.controller('SectoresCtrl', function($scope, Sectores) {
  $scope.sector = Sectores.all();
})

.controller('SectorDetalleCtrl', function($scope, $stateParams, Sectores, $cordovaFileTransfer, $ionicPopup, $state, $window, $cordovaFileOpener2, $cordovaFile, $cordovaProgress, $cordovaDialogs, $cordovaSpinnerDialog, $cordovaToast) { 

  $scope.sec = Sectores.get($stateParams.sId);
  $scope.errorsote = null;
  $scope.progreso = null;

  $scope.abrirEnlace=function(url){
    // Primero se obtiene unicamente el nombre del archivo
    var filename = url.split("/").pop();
    var confirmPopup = $ionicPopup.confirm({
     title: 'Confirmar',
     template: 'Desea Descargar este Archivo?'+filename
   });
    confirmPopup.then(function(res) {
     if(res) {
        //Seleccionaa el lugar donnde se guardara y con el nombre anterior
        var targetPath = cordova.file.externalRootDirectory + filename;
          $cordovaToast.show('Descargando...', '500', 'center')
            .then(function(success) {
              // success
            }, function (error) {
              // error
          });

    //El pluginn hace todo lo demas
    $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
      //Cuando se termina de descargar el archivo entra a esta parte de la funcion
      //Asi que aqui decimos que ya acabo de descargar
      //alert("Se finalizo la descarga");
      /*$cordovaDialogs.alert('message', 'title', 'button name')
    .then(function() {
      // callback success
    });*/
     $cordovaDialogs.confirm('Archivo guardado en tu memoria SD', 'Descarga exitosa!:', ['OK','Ver'])
    .then(function(buttonIndex, result) {
      $scope.open(cordovaFileOpener2.file.externalRootDirectory);
      var btnIndex = buttonIndex;
    });
      console.log('Success');
      //Simple mensaje para que sepa el usuario que pasa
      $scope.progreso.loaded = "Progreso Culminado";
    }, function (error) {
      //En caso de que halla un error entra aqui y lo que hacemos es guardar el error en
      //una variable para ser mostrada
      $scope.errorsote = error;
      console.log('Error');
    }, function (progress) {
      //Este es el progreso de la descarga te va diciendo cuantos bytes va descargado
      //Y lo unico que se hace aqui es guardar el valor en la variable de progreso para ser mostrada
      $scope.progreso = progress;
    });
     } else {
       console.log('You are not sure');
     }
   });
  }

  $scope.cargarNuevosPosts = function(){

    if ($scope.info.length > 0) {
      var params2={'before':$scope.info[0].name};                                                  
    }
    else{
      return;
    }
    $http.get("http://192.168.0.104/generar.php",{params:params2}) 
    .success(function(data) { 
      var newPosts = [];
      $scope.info = data; 
      $scope.info = newPosts.concat($scope.info);
    }) /*$scope.jsons = newPosts.concat($scope.jsons);*/
    .finally(function() {
        // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  }


})

.controller('SitiosMexicoCtrl', function($scope, $state) {
  
  $scope.sitiosC=function(){
              $state.go('tab.tab-sitios');
  }
  $scope.link2=function(url){
    window.open('http://www.gobiernoabierto.cdmx.gob.mx/sigdata/index.php/Publicacion/index','_self');
  }
  $scope.link3=function(url){
    window.open('http://datos.gob.mx/','_self');
  }
  $scope.link6=function(url){
    window.open('http://datosabiertoszacatecas.org.mx/','_self');
  }
})

.controller('SitiosCtrl', function($scope, $state, $ionicLoading) {
  $ionicLoading.show({
    template: '<ion-spinner icon="lines"></ion-spinner <br/> Cargando',
    duration: 6000
  });

  $scope.link=function(url) {
    window.open('http://datos.gob.ar/','_self');
  }
  $scope.link1=function(url) {
    window.open('http://dados.gov.br/','_self');
  }
  $scope.sitioM=function(){
              $state.go('sitioMexico');
  }
  $scope.link4=function(url){
    window.open('https://data.gov.uk/','_self');
  }
  $scope.link5=function(url) {
    window.open('http://publicdata.eu/','_self');
  }
});
