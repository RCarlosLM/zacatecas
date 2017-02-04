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

.controller('SectorDetalleCtrl', function($scope, $stateParams, Sectores, $cordovaFileTransfer) { 
  $scope.sec = Sectores.get($stateParams.sId);
  $scope.errorsote = null;
  $scope.progreso = null;

  $scope.abrirEnlace=function(url){
    // Primero se obtiene unicamente el nombre del archivo
    var filename = url.split("/").pop();
    //Seleccionaa el lugar donnde se guardar y con el nombre anterior
    var targetPath = cordova.file.externalRootDirectory + filename;

    //El pluginn hace todo lo demas
    $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
      //Cuando se termina de descargar el archivo entra a esta parte de la funcion
      //Asi que aqui decimos que ya acabo de descargar
      console.log('Success');
      alert("Se finalizo la descarga");
      //Simple mensaje para que sepa el usuario que pasa
      $scope.progreso.loaded = "Descarga exitosa!: Archivo guardado en tu memoria SD";
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
    }) 
    .finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });

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

  $scope.sitiosC=function(){
              $state.go('tab.tab-sitios');
 }

  $scope.link2=function(url){
    window.open('http://www.gobiernoabierto.cdmx.gob.mx/sigdata/index.php/Publicacion/index','_self');
  }

  $scope.link3=function(url){
    window.open('http://datos.gob.mx/','_self');
  }

  $scope.link4=function(url){
    window.open('https://data.gov.uk/','_self');
  }

  $scope.link5=function(url) {
    window.open('http://publicdata.eu/','_self');
  }

  $scope.link6=function(url){
    window.open('http://datosabiertoszacatecas.org.mx/','_self');
  }


});
