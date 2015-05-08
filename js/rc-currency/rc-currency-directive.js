define(['angular'], function(ng) {
    var THOUSANDS_SEPARATOR = ' ';
    var DECIMAL_SEPARATOR = ',';
    var MAX_VALUE = 9999999999.99;

    var currentCaretPosition = null;


    /**
     * ќбъект валидных нажатий (+сочетаний) клавиш
     *
     * @type {object}
     */
    var successKeyCodes = {
        'escape': {code: 27},
        'tab': {code: 9},
        'enter': {code: 13},
        'backspace': {code: 8},
        'delete': {code: 46},
        'home': {code: 36},
        'end': {code: 35},
        'pageUp': {code: 33},
        'pageDown': {code: 34},
        'leftArrow': {code: 37},
        'rightArrow': {code: 39},
        'upArrow': {code: 38},
        'downArrow': {code: 40},
        'numDot': {code: 110},
        'enDot': {code: 190},
        'ruDot': {code: 191},
        'F5': {code: 116},
        'ctrl+a': {code: 65, specKey: ["ctrlKey"]},
        'ctrl+c': {code: 67, specKey: ["ctrlKey"]},
        'ctrl+v': {code: 86, specKey: ["ctrlKey"]},
        'ctrl+insert': {code: 45, specKey: ["ctrlKey"]}
    };

    /**
     * ”правление кареткой
     *
     * @param {HTMLElement} element элемент
     * @constructor
     */
    var CaretPosition = function(element) {
        if (!(element instanceof HTMLElement)) {
            throw new Error('Element must be native DOM-node');
        }

        this.element = element;
    };


    /**
     * ѕолучение текущего местоположени¤ каретки
     *
     * @returns {number}
     */
    CaretPosition.prototype.get = function() {
        var position = 0;

        if (document.selection) {
            this.element.focus();
            var selection = document.selection.createRange();

            selection.moveStart('character', -this.element.value.length);
            position = selection.text.length;
        }
        else if (this.element.selectionStart || this.element.selectionStart == '0') {
            position = this.element.selectionStart;
        }

        return position;
    };


    /**
     * ”становка местоположени¤ каретки
     *
     * @param {number} position
     */
    CaretPosition.prototype.set = function(position) {
        if (this.element.createTextRange) {
            var range = this.element.createTextRange();

            range.move('character', position);
            range.select();
        }
        else {
            if (this.element.selectionStart) {
                this.element.focus();
                this.element.setSelectionRange(position, position);
            }
            else {
                this.element.focus();
            }
        }
    };


    /**
     * –асчет местоположени¤ каретки
     *
     * @param {string} newValue
     * @param {string} oldValue
     * @returns {*}
     */
    CaretPosition.prototype.calc = function(newValue, oldValue, newConvertedValue, oldConvertedValue) {
        var newCaretPosition = this.get();
        var delta = newConvertedValue.length - oldConvertedValue.length;

        if (delta === 2) {
            newCaretPosition += 1;
        }
        else if (delta === -2) {
            newCaretPosition -= 1;
        }

        if (newConvertedValue[newCaretPosition > currentCaretPosition ? newCaretPosition : currentCaretPosition] === THOUSANDS_SEPARATOR) {
            newCaretPosition += 1;
        }

        return newCaretPosition;
    };


    /**
     * ?иректива-атрибут rc-currency
     *
     * @constructor
     */
    var RCCurrencyDirective = function(rcCurrencyService) {
        this.restrict = 'A';

        this.require = 'ngModel';

        this.link = function($scope, element, attrs, modelController) {
            var oldValue = modelController.$viewValue;
            var $element = ng.element(element);
            var caretPosition = new CaretPosition(element[0]);

            var newConvertedValue;
            var oldConvertedValue;
            var pos;

            modelController.$parsers.push(function(value) {
                var parsed = rcCurrencyService.parse(value);

                console.log('parse', modelController.$modelValue, parsed);

                oldValue = modelController.$viewValue;

                if (parsed > MAX_VALUE) {
                    parsed = modelController.$modelValue;
                }

                var formattedValued = rcCurrencyService.format(parsed);

                if (modelController.$viewValue !== formattedValued) {
                    newConvertedValue = rcCurrencyService.format(modelController.$viewValue, false);
                    oldConvertedValue = rcCurrencyService.format(oldValue, false);
                    pos = caretPosition.calc(modelController.$viewValue, oldValue, newConvertedValue, oldConvertedValue);

                    modelController.$setViewValue(formattedValued);
                    modelController.$render();
                }

                return parsed;
            });

            var $render = modelController.$render.bind(modelController);

            modelController.$render = function() {

                $render();

                if (currentCaretPosition !== null) {
                    caretPosition.set(pos);
                }
            }

            modelController.$validators.all = function(value) {
                return value <= MAX_VALUE;
            };

            modelController.$formatters.push(function(value) {
                console.log('format');

                if (rcCurrencyService.parse(value) > MAX_VALUE) {
                    modelController.$rollbackViewValue();
                } else {
                    return rcCurrencyService.format(value);
                }

            });

            $element.on('keydown', function(event) {
                //значение
                var value = $element.val();
                //кейкод
                var keyCode = event.witch || event.keyCode;
                //нажат шифт, контрл или альт
                var isPushedHelpButton = event.shiftKey || event.ctrlKey || event.altKey;
                //кей-коды точек
                var dotKeyCodes = [110, 190, 191];
                //нажата допустима¤ клавиша
                var isSuccessKey = false;
                //нажата кнопка цифры
                var isPushedNumberButton = (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105);
                //текуща¤ позици¤ каретки
                currentCaretPosition = caretPosition.get();
                //каретка находитс¤ в дробной части
                var caretInDecimalPart = value.indexOf(DECIMAL_SEPARATOR) < caretPosition.get();
                //массив текущего значени¤, разделенный точкой
                var valueArray = value.split(DECIMAL_SEPARATOR);
                //значение дробной части
                var decimalPart = valueArray[1];
                //значение дробной части состоит из двух символов
                var decimalPartIsFull = (decimalPart || '').length >= 2;
                //значение содержит точку
                var valueHasDot = value.indexOf(DECIMAL_SEPARATOR) >= 0;
                //находитс¤ ли каретка в конце строки
                var caretInEndOfString = currentCaretPosition === value.length;

                ng.forEach(successKeyCodes, function(key) {
                    if (keyCode == key.code) {
                        isSuccessKey = true;

                        if (key.specKey && key.specKey.length > 0) {

                            var isSpecKeyCorrect = true;

                            ng.forEach(key.specKey, function(key, index) {
                                if (event[key] === false) {
                                    isSpecKeyCorrect = false;

                                    return false;
                                }
                            });

                            isSuccessKey = isSpecKeyCorrect;
                        }
                    }
                });

                if (!(isSuccessKey || isPushedNumberButton && !isPushedHelpButton)) {
                    event.preventDefault();
                }

                if (decimalPartIsFull && isPushedNumberButton && caretInDecimalPart) {
                    event.preventDefault();
                }

                if ((valueHasDot || !caretInEndOfString) && dotKeyCodes.indexOf(keyCode) >= 0) {
                    event.preventDefault();
                }
            });

            $element.on('change blur', function() {
                currentCaretPosition = null;
            });
        };
    };

    return ['rcCurrencyService', function(rcCurrencyService) {
        return new RCCurrencyDirective(rcCurrencyService);
    }];
});
