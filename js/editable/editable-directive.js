define([
  'text!editable/editable-directive.html'
], function(template) {

  function EditableDirective() {
    return {
      transclude: true,
      template: template,
      scope: {
        model: '=rcEditable'
      },
      link: function(scope, elem, attrs) {
        var $input = elem.find('input');
        var input = $input[0];
        var $field = elem.find('span');

        init();

        scope.setToEdit = function() {
          toggleElements();

          setTimeout(input.focus.bind(input), 0)
        };

        function toggleElements() {
          $field.toggleClass('ng-hide');
          $input.toggleClass('ng-hide');
        }

        function setToRead() {
          if (scope.model) {
            toggleElements();
          }
        }

        function init() {
            (scope.model ? $input : $field).addClass('ng-hide');

            $input.on('blur', setToRead)
        }
      }
    }
  }

  return EditableDirective;
});
