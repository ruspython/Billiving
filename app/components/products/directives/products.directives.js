(function () {
    'use strict';

    angular
        .module('products.directives')
        .directive('product', product)
        .directive('products', products)
        ;

    function products() {
        var directive = {
            controller: 'ProductsController',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                products: '='
            },
            templateUrl: 'app/components/products/list.html'

        };
        return directive;
    }

    function product() {
        var directive = {
            restrict: 'E',
            scope: {
                product: '='
            },
            templateUrl: 'app/components/products/detail.html'

        };
        return directive;
    }
})();