(function () {
    'use strict';

    angular
        .module('products.controllers')
        .controller('DetailController', DetailController);

    DetailController.$inject = ['$scope', '$routeParams', 'Products'];

    function DetailController($scope, $routeParams, Products) {
        $scope.product = [];

        activate();

        function activate() {
            //$scope.$watchCollection(function () { return $scope.products; }, render);
            //$scope.$watch(function () { return $(window).width(); }, render);
            Products.get($routeParams.id).then(getSuccessFn, getErrorFn);
        }

        function getSuccessFn(data, status, headers, config) {
            $scope.product = data.data;
        }

        function getErrorFn(data, status, headers, config) {
            alert('error loading');
        }

    }
})();