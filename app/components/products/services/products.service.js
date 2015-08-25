(function () {
    'use strict';

    angular
        .module('products.services')
        .factory('Products', Products);

    Products.$inject = ['$http'];

    function Products($http) {
        var subdomain = window.location.host.split('.')[0];
        var Products = {
                all: all,
                filter: filter,
                get: get,
                categories: categories,
                settings: settings,
                paypalEmail: paypalEmail
            },
            API_ENDPOINT = 'http://billiving-qa.azurewebsites.net/api2/v1/',
            config = {
                headers: {
                    'X-Subdomain': subdomain
                }
            }
            ;

        return Products;

        function all(filterParams) {
            var filterConfig = {};
            merge_obj(config, filterConfig);
            filterConfig.params = filterParams;
            return $http.get(API_ENDPOINT+'subdomain/products', filterConfig);
            //return $http.get('products.json', config);
        }

        function filter(filterParams) {
            var filterConfig = {};
            merge_obj(config, filterConfig);
            filterConfig.params = filterParams;
            console.log(filterParams);
            return $http.get(API_ENDPOINT+'subdomain/products', filterConfig);
        }

        function get(id) {
            return $http.get(API_ENDPOINT+'subdomain/products/'+id, config);
            //return $http.get('product.json', config);
        }

        function categories() {
            return $http.get(API_ENDPOINT+'subdomain/categories', config);
        }

        function settings() {
            return $http.get(API_ENDPOINT+'subdomain/settings', config);
        }

        function paypalEmail() {
            return $http.get(API_ENDPOINT+'subdomain/gateway/paypal', config);
        }
        //

        function merge_obj(obj1, obj2) {
            for (var key in obj1) {
                obj2[key] = obj1[key];
            }
        }
    }
})();