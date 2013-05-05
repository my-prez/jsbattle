'use strict';

angular.module('public.sebmadeApp')
    .controller('MainCtrl', function ($scope, api) {
        $scope.players = [];

        api.getPlayers().success(function (data) {
            $scope.players = data;
        });

        $scope.removePlayer = function (player) {
            api.removePlayer(player).success(function () {
                $scope.players.splice($scope.players.indexOf(player), 1);
            });
        };

        $scope.readyToFight = function () {
            return _.where($scope.players, {ready: true}).length == 2;
        }

        $scope.fights = [];

        api.getFights().success(function (data) {
            $scope.fights = data;
        });

        $scope.createFight = function () {
            var selectedPlayers = _.select($scope.players, function (o) {
                return o.ready;
            });
            var fight = {
                opponentOne: selectedPlayers[0],
                opponentOneScore: 0,
                opponentTwo: selectedPlayers[1],
                opponentTwoScore: 0
            };
            api.addFight(fight).success(function (data) {
                $scope.fights.push(data);
            });
        };

        $scope.removeFight = function (fight) {
            api.removeFight(fight).success(function () {
                $scope.fights.splice($scope.fights.indexOf(fight), 1);
            });
        };

    });
