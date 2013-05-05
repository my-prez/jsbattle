'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('public.sebmadeApp'));

    var MainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        $httpBackend.when("GET", "/players").respond([
            {firstName: 'test', lastName: 'TEST'}
        ]);

        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });

        $httpBackend.flush();

    }));

    it('should attach a list of players to the scope', function () {
        expect(scope.players.length).toBe(1);
    });
});
