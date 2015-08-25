(function() {
    'use strict';

    angular
        .module('products.controllers')
        .filter('cut', CutFilter)
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'Products', '$rootScope'];

    function MainController($scope, Products, $rootScope) {
        $scope.IMAGE_DIR = 'https://billiving-qa.azurewebsites.net/resources/Uploads/4755/';
        $scope.LOGO_DIR = '';
        $scope.CURRENCY_SYMBOL = '';
        $rootScope.firstLoad = true;
        $rootScope.loading = true;

        Products.settings().then(settingsSuccessFn, settingsFailFn);
        Products.paypalEmail().then(paypalSuccessFn, settingsFailFn);

        function settingsSuccessFn (data, status, headers, config) {
            $scope.LOGO_DIR = data.data.Logo;
            $scope.CURRENCY_SYMBOL = data.data.CurrencySymbol;
        }

        function paypalSuccessFn (data, status, headers, config) {
            $scope.PAYPAL_ENABLED = (data.data.length > 0);
        }

        function settingsFailFn (data, status, headers, config) {
            console.error("Can not load settings");
        }
    }

    function CutFilter() {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    }
})();
