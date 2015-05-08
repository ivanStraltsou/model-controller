define([
    'angular'
], function(ng) {

    var DECIMAL_SEPARATOR = ',';

    function RCCurrencyFilter(rcCurrencyService) {
        return function(value, completeDecimals) {
            var valueArray = rcCurrencyService.format(value, true, completeDecimals).split(DECIMAL_SEPARATOR);
            var result = '<span class="rc-currency__wholes">' + (valueArray[0] || 0) + '</span>';

            if (valueArray[1]) {
                result +=
                '<span class="rc-currency__decimal-point">' + DECIMAL_SEPARATOR + '</span>' +
                '<span class="rc-currency__decimals">' + valueArray[1] + '</span>';
            }

            return result;
        };
    };

    return ['rcCurrencyService', RCCurrencyFilter];
});
