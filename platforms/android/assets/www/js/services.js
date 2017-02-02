angular.module('starter.services', [])

.factory('Sectores', function($http, $rootScope) {
  // Might use a resource here that returns a JSON array

  

                                                var sector= $rootScope.sector;

                                                  return {
                                                          all: function() {
                                                                            return sector;
                                                                          },
                                                            remove: function(sec) {
                                                                                      sector.splice(sector.indexOf(sec), 1);
                                                                                   },
                                                            get: function(sId) {
                                                                                    for (var i = 0; i < sector.length; i++) {
                                                                                                                            if (sector[i].id === parseInt(sId)) {
                                                                                                                                                                    return sector[i];
                                                                                                                                                                  }
                                                                                                                           }
                                                                                    return null;
                                                                                  }
                                                          };
                                                });
