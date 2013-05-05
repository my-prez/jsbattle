'use strict';

angular.module('public.sebmadeApp')
  .controller('MainCtrl', function ($scope, api) {
        $scope.players = [];

        api.getPlayers().success(function(data) {
            $scope.players = data;
        });

        $scope.removePlayer = function (player) {
            api.removePlayer(player).success(function (data) {
                $scope.players.splice($scope.players.indexOf(player), 1);
            });
        };

    });
