'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('public.sebmadeApp'));

    var MainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $httpBackend) {
        $httpBackend.when("GET", "/players").respond([{firstName: "test", lastName: "TEST"}]);
        $httpBackend.when("GET", "/fights").respond([{name: "test"}]);
        scope = {};
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
        $httpBackend.flush();
    }));

    it('should init list players', function () {
        expect(scope.players.length).toBe(1);
    });
});
