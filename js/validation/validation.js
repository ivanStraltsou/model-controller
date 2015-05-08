define([
  'angular',
  'text!validation/validation-message.html',
  'angularMessages'
], function(
  ng,
  messageTemplate
) {

  ng.module('rc-validation', ['ngMessages'])
    .run(['$templateCache', function($templateCache) {

      // add basic validation errors set to cache
      $templateCache.put('validation-messages.html', messageTemplate);
    }])
    .directive('rcValidateLower', function() {
      return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelController) {

          // it's a bit weird but still, use your custom logic instead
          ngModelController.$validators['rcLower'] = function(value) {
            var modelValue = parseFloat(value);
            var dependentValue = scope.$eval(attrs.rcDependOn);
            var isValid = [value, dependentValue].reduce(function(is, value) {
              return is && isFinite(value);
            }, true);

            dependentValue = parseFloat(dependentValue);

            return isValid && modelValue < dependentValue;
          };

          scope.$watchGroup([attrs.ngModel, attrs.rcDependOn], ngModelController.$validate);
        }
      };
    });
});
