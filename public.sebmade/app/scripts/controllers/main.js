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
                    $log.info("player successfully removed");
                    $scope.players.splice($scope.players.indexOf(p), 1);
                })
                .error(function () {
                    $log.error("players remove fail");
                });
        };
        $scope.readyToFight = function() {
            return _.where($scope.players, {ready: true}).length == 2;
        }
        $scope.fights = [];
        $http.get("/fights")
            .success(function (data) {
                $scope.fights = data;
            })
            .error(function () {
                $log.error("/fights fail")
            });
        $scope.createFight = function() {
            $log.info("createFight");
            var selectedPlayers = _.select($scope.players, function(o) {
                return o.ready;
            });
            var fight = {};
            fight.opponentOne = selectedPlayers[0];
            fight.opponentOneScore = 0;
            fight.opponentTwo = selectedPlayers[1];
            fight.opponentTwoScore = 0;
            $http.post("/fights", fight)
                .success(function(data) {
                    $log.info("add fight : "+data);
                    $scope.fights.push(data);
                }).error(function () {
                    $log.error("fight create fail")
                });
        }
        $scope.removeFight = function (f) {
            $http.delete("/fights/" + f.id)
                .success(function (data) {
                    $log.info("fight successfully removed");
                    $scope.fights.splice($scope.fights.indexOf(f), 1);
                })
                .error(function () {
                    $log.error("fight remove fail");
                });
        };
        $scope.incrementScore = function(f, s) {
            f[s]++;
            $http.put("/fights/"+f.id, f);
        };
        $scope.decrementScore = function(f, s) {
            f[s]--;
            $http.put("/fights/"+f.id, f);
        };
    });
