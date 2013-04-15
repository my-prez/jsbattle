'use strict';

angular.module('public.sebmadeApp')
    .controller('PlayerCtrl', function ($scope, $http, $routeParams, $log, $location) {
        $scope.player = {};

        if ($routeParams.id) {
            $http.get("/players/" + $routeParams.id)
                .success(function (data) {
                    $scope.player = data;
                })
                .error(function () {
                    $log.error("player get fail")
                });
        }

        $scope.updatePlayer = function () {
            $http.put("/players/" + $scope.player.id, $scope.player)
                .success(function (data) {
                    $log.info("update player : " + data.id);
                    $location.path("#/");
                }).error(function () {
                    $log.error("player update fail")
                });
        };

        $scope.addPlayer = function () {
            $http.post("/players", $scope.player)
                .success(function (data) {
                    $log.info("add player : " + data);
                    $location.path("#/");
                }).error(function () {
                    $log.error("player add fail")
                });
        };
    });
