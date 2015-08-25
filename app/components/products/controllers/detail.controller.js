(function () {
    'use strict';

    angular
        .module('products.controllers')
        .controller('DetailController', DetailController);

    DetailController.$inject = ['$scope', '$routeParams', 'Products', '$rootScope'];

    function DetailController($scope, $routeParams, Products, $rootScope) {
        $scope.product = [];
        $rootScope.loading = true;

        activate();

        function activate() {
            Products.get($routeParams.id).then(getSuccessFn, getErrorFn);
        }

        function getSuccessFn(data, status, headers, config) {
            $scope.product = data.data;
            $rootScope.loading = false;
        }

        function getErrorFn(data, status, headers, config) {
            console.error('error loading detail');
        }

    }
})();