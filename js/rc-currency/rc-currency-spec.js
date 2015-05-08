define(['angularMocks', 'rc-currency/rc-currency'], function() {

    describe('rc-currency', function() {
        var $compile,
            $rootScope;

        // Load the myApp module, which contains the directive
        beforeEach(module('rc-currency'));

        // Store references to $rootScope and $compile
        // so they are available to all tests in this describe block
        beforeEach(inject(function(_$compile_, _$rootScope_){
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        }));

        it('Replaces the element with the appropriate content', function() {
            // Compile a piece of HTML containing the directive
            var element = $compile('<input rc-currency ng-model="test"/>')($rootScope);

            $rootScope.test = 22222;
            $rootScope.$digest();
            expect(element.val()).toEqual('22 222');

            $rootScope.test = 1234.5;
            $rootScope.$digest();
            expect(element.val()).toEqual('1 234,50');

            element.val('4 985,90').triggerHandler('change');
            expect($rootScope.test).toEqual(4985.9);
        });
    });
});
