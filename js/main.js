require.config({
    baseUrl: '/js',
    paths: {
        text: 'vendor/requirejs/require-text',
        angular: '../node_modules/angular/angular',
        angularSanitize: '../node_modules/angular-sanitize/angular-sanitize',
        angularMessages: '../node_modules/angular-messages/angular-messages',
        angularMocks: '../node_modules/angular-mocks/angular-mocks'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        angularSanitize: {
            deps: ['angular']
        },
        angularMessages: {
            deps: ['angular']
        },
        angularMocks: {
            deps: [
                'angular'
            ]
        }
    },
    config: {
        text: {
            //for CORS requests
            useXhr: function() {
                return true;
            }
        }
    }
})([
    'angular',
    'app'
], function(ng) {

    ng.bootstrap(document, ['rc3']);
});