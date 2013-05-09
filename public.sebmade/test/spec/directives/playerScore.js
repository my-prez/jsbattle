'use strict';

describe('Directive: playerScore', function () {
  beforeEach(module('public.sebmadeApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<player-score></player-score>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the playerScore directive');
  }));
});
