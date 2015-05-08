define(['angularMocks', 'app'], function() {
    describe('AppController tests', function() {

        var $controller,
            $rootScope,
            controller,
            scope;

        // Load the myApp module, which contains the directive
        beforeEach(module('rc3'));

        // Store references to $rootScope and $compile
        // so they are available to all tests in this describe block
        beforeEach(inject(function(_$controller_, _$rootScope_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_;
            $rootScope = _$rootScope_;
        }));

        beforeEach(function() {
            scope = $rootScope.$new();

            controller = $controller('AppController', {
                $scope: scope
            });
        });

        it('Replaces the element with the appropriate content', function() {

            expect(controller.model).toEqual(123456.7);

        });

        it('Change model test', function() {
            controller.newModel = 22;
            controller.changeModel();

            expect(controller.model).toEqual(22);
        });
    });
});
