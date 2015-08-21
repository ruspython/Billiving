(function () {
    'use strict';

    angular
        .module('products.services')
        .factory('Products', Products);

    Products.$inject = ['$http'];

    function Products($http) {
        var Products = {
                all: all,
                get: get,
                categories: categories
            },
            API_ENDPOINT = 'http://billiving-qa.azurewebsites.net/api2/v1/',
            config = {
                headers: {
                    'X-Subdomain': 'subdomain'
                }
            }
            ;

        return Products;

        function all() {
            //return $http.get(API_ENDPOINT+'subdomain/products?CategoryId=1', config);
            return $http.get('products.json', config);
        }

        function get(id) {
            //return $http.get(API_ENDPOINT+'subdomain/products/'+id, config);
            return $http.get('product.json', config);
        }

        function categories() {
            return $http.get(API_ENDPOINT+'subdomain/categories', config);
        }
    }
})();