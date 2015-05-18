define([
  'angular',
  'editable/editable-directive'
], function(
  ng,
  EditableDirective
) {

  ng.module('rc-editable', [])
    .directive('rcEditable', EditableDirective)
});