(function () {
    'use strict';

    angular
        .module('products', [
            'products.routes',
            'products.controllers',
            'products.directives',
            'products.services'
        ]);

    angular
        .module('products.controllers', ['infinite-scroll', 'ngAnimate', 'ui.bootstrap']);

    angular
        .module('products.directives', []);

    angular
        .module('products.services', []);

    angular
        .module('products.routes', ['ngRoute']);

})();