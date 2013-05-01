'use strict';

angular.module('public.sebmadeApp')
    .directive('playerScore', function (api) {
        return {
            templateUrl: 'views/fight.html',
            restrict: 'E',
            scope: {fight: '=', opponent: '@', opponentScore: '@'},
            link: function postLink(scope, element, attrs) {
                scope.incrementScore = function () {
                    scope.fight[scope.opponentScore]++;
                    api.updateFight(scope.fight);
                }
                scope.decrementScore = function () {
                    scope.fight[scope.opponentScore]--;
                    api.updateFight(scope.fight);
                }
            }
        };
    });
