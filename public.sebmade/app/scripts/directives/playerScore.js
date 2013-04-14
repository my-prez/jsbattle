'use strict';

angular.module('public.sebmadeApp')
  .directive('playerScore', function ($parse) {
    return {
      templateUrl: 'views/fight.html',
      restrict: 'E',
      scope: {incrementScore: '&', decrementScore:'&', fight: '=', opponent : '@', opponentScore: '@'},
      link: function postLink(scope, element, attrs) {
      }
    };
  });
