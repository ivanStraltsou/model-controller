define([
  'app-controller',
  'angular',
  'rc-currency/rc-currency',
  'validation/validation',
  'editable/editable'
], function(AppController, ng) {

  return ng.module('rc3', [
    'rc-currency',
    'rc-validation',
    'rc-editable'
  ])
    .controller('AppController', AppController);
});
