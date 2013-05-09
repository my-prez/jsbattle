'use strict';

angular.module('public.sebmadeApp')
    .directive('playerScore', function (api) {
        return {
            templateUrl: 'views/playerScore.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {


            }
        };
    });
