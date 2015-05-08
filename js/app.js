define(['app-controller', 'angular', 'rc-currency/rc-currency', 'validation/validation'], function(AppController, ng) {

    return ng.module('rc3', ['rc-currency', 'rc-validation'])
             .controller('AppController', AppController);

});
