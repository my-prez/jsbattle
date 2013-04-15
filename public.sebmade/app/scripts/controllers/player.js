'use strict';

angular.module('public.sebmadeApp')
    .controller('PlayerCtrl', function ($scope, $http, $routeParams, $log, $location) {
        $scope.player = {};

        $http.get("/players/" + $routeParams.id)
            .success(function (data) {
                $scope.player = data;
            })
            .error(function () {
                $log.error("player get fail")
            });

        $scope.updatePlayer = function () {
            if ($scope.player.id) {
                $http.put("/players/" + $scope.player.id, $scope.player)
                    .success(function (data) {
                        $log.info("update player : " + data.id);
                        $location.path("#/");
                    }).error(function () {
                        $log.error("player update fail")
                    });
            } else {
                $http.post("/players", $scope.player)
                    .success(function (data) {
                        $log.info("add player : " + data);
                        $location.path("#/");
                    }).error(function () {
                        $log.error("player add fail")
                    });
            }
        };
    });
