'use strict';

angular.module('public.sebmadeApp')
    .controller('MainCtrl', function ($scope, $http, $log, $location) {
        $scope.players = [];
        $http.get("/players")
            .success(function (data) {
                $scope.players = data;
            })
            .error(function () {
                $log.error("/players fail")
            });
        $scope.addPlayer = function (fn, ln, tw, frk) {
            $http.post("/players", {firstName: fn, lastName: ln, twitter: tw, framework: frk})
                .success(function (data) {
                    $log.info("add player : " + data);
                    $scope.players.push(data);
                    $location.path("/");
                }).error(function () {
                    $log.error("/players add fail")
                });
        };
        $scope.removePlayer = function (p) {
            $http.delete("/players/" + p.id)
                .success(function (data) {
                    $log.info("player succefully removed");
                    $scope.players.splice($scope.players.indexOf(p), 1);
                })
                .error(function () {
                    $log.error("players remove fail");
                });
        };
        $scope.readyToFight = function() {
            return _.where($scope.players, {ready: true}).length == 2;
        }
        $scope.createFight = function() {
            $log.info("createFight");
        }
    });
