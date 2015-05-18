define(['app'], function(app) {

  function AppController($scope, $rcCurrencyService) {
    this.model = 123456.7;
    this.newModel = '';
    this.options = [
      {id: 1, value: 1000.5},
      {id: 2, value: 123456.7}
    ];

    this.model2 = 12345;

    this.changeModel = function() {
      this.model = this.newModel;
      this.rcCurrencyFormat = $rcCurrencyService.format(this.model, false);
    };
  };

  return [
    '$scope',
    'rcCurrencyService',
    AppController
  ];
});
