define([], function() {
    var THOUSANDS_SEPARATOR = ' ';
    var DECIMAL_SEPARATOR = ',';
    var MAX_VALUE = 9999999999.99;

    /**
     * ‘орматирование числа
     *
     * @param {number} value число дл¤ форматировани¤
     * @param {boolean} decimals включать ли в форматирование дес¤тичные доли числа
     *
     *  @example пример использовани¤ с параметром decimals = false
     * // returns '1 000.'
     * rcFormat('1000.', false);
     * @returns {Number} возвращает отфотматированное число, не форматиру¤ дробную часть
     *
     * @example пример использовани¤ с параметром decimals = true
     * // returns '1 000.00'
     * rcFormat('1000.', true);
     * @returns {Number} возвращает отфотматированное число с форматированием дробной части
     */
    var rcFormat = function(value, decimals, completeDecimals) {
        var result;

        decimals = typeof decimals === 'undefined';
        value = value || '';

        //превращение разделител¤ дробной части в точку дл¤ работы с строкой как с числом
        value = value.toString().replace(new RegExp('[.,/?юё>' + DECIMAL_SEPARATOR + ']', 'g'), '.');

        //удаление всего, кроме цифр и точки
        value = value.replace(/[^0-9.]/g, '');

        var valueArray = value.split('.');
        var wholePart = valueArray[0] || '0';
        var decimalPart = valueArray[1];
        var decimalPartExist = typeof decimalPart === 'string';

        if (completeDecimals || (decimals && decimalPartExist)) {
            result = (+(wholePart + '.' + (decimalPart || 0))).toFixed(2);
        }
        else {
            result = decimalPartExist
                ? (wholePart + '.' + decimalPart)
                : value;
        }

        if (decimalPart && decimalPart.length > 2) {
            result = (+result).toFixed(2);
        }

        result = result.toString().replace(/\./g, DECIMAL_SEPARATOR);

        //удаление ведущих нулей
        if (wholePart.length > 1) {
            result = result.replace(/^0+(?!\.|$)/, '');
        }

        //разделение по разр¤дам
        result = result.replace(/\B(?=(\d{3})+(?!\d))/g, THOUSANDS_SEPARATOR);

        return result;
    };


    /**
     * ѕриведение форматированной строки в число
     *
     * @param value значение
     *
     */
    var rcParse = function(value) {
        return typeof value !== 'number'
            ? Number((value || '').replace(/[ ]/g, '').replace(/[,]/g, '.'))
            : value;
    };

    return function RCCurrencyService() {

        this.format = rcFormat;
        this.parse = rcParse;

    }
});
