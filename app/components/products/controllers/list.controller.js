(function () {
    'use strict';

    angular
        .module('products.controllers')
        .controller('ListController', ListController);

    ListController.$inject = ['$scope', 'Products'];

    function ListController($scope, Products) {
        $scope.columns = [];
        $scope.products = [];
        $scope.categories = [];

        $scope.loadMore = function () {
            Products.all().then(allSuccessFn, allErrorFn);
        };

        activate();

        function activate() {
            //$scope.$watchCollection(function () { return $scope.products; }, render);
            //$scope.$watch(function () { return $(window).width(); }, render);

            Products.categories().then(categoriesSuccessFn, categoriesErrorFn);
            Products.all().then(allSuccessFn, allErrorFn);
        }

        function categoriesSuccessFn(data, status, headers, config) {
            $scope.categories = data.data;
            console.log('categories data');
            console.log(data.data);
        }

        function categoriesErrorFn(data, status, headers, config) {
            alert('error categories loading');
        }

        function allSuccessFn(data, status, headers, config) {
            $scope.products = data.data;
            console.log('all data');
            console.log(data.data);
        }

        function allErrorFn(data, status, headers, config) {
            alert('error all loading');
        }

        //function calculateNumberOfColumns() {
        //    var width = $(window).width();
        //
        //    if (width >= 1200) {
        //        return 3;
        //    } else if (width >= 992) {
        //        return 2;
        //    } else {
        //        return 1;
        //    }
        //}
        //
        //function approximateShortestColumn() {
        //    var scores = $scope.columns.map(columnMapFn);
        //
        //    return scores.indexOf(Math.min.apply(this, scores));
        //
        //    function columnMapFn(column) {
        //        var lengths = column.map(function (element) {
        //            return element.content.length;
        //        });
        //
        //        return lengths.reduce(sum, 0) * column.length;
        //    }
        //
        //    function sum(m, n) {
        //        return m + n;
        //    }
        //}
        //function render(current, original) {
        //    if (current !== original) {
        //        $scope.columns = [];
        //
        //        for (var i = 0; i < calculateNumberOfColumns(); ++i) {
        //            $scope.columns.push([]);
        //        }
        //
        //        for (var i = 0; i < current.length; ++i) {
        //            var column = approximateShortestColumn();
        //
        //            $scope.columns[column].push(current[i]);
        //        }
        //    }
        //}
    }
})();