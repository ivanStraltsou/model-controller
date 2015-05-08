define([
  'angular',
  'rc-currency/rc-currency-service',
  'rc-currency/rc-currency-filter',
  'rc-currency/rc-currency-directive',
  'angularSanitize'
], function(ng,
  RCCurrencyService,
  RCCurrencyFilter,
  RCCurrencyDirective) {

  ng.module('rc-currency', ['ngSanitize'])
    .directive('rcCurrency', RCCurrencyDirective)
    .filter('rcCurrency', RCCurrencyFilter)
    .service('rcCurrencyService', RCCurrencyService);
});