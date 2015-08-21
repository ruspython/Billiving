(function () {
    'use strict';

    angular
        .module('products.routes')
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'ListController',
                templateUrl: 'app/components/products/list.html'
            })
            .when('/product/:id', {
                controller: 'DetailController',
                templateUrl: 'app/components/products/detail.html'
            })
            .otherwise('/');
    }
})();