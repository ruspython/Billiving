(function () {
    'use strict';

    angular
        .module('products.controllers')
        .controller('ListController', ListController);

    ListController.$inject = ['$scope', 'Products', '$timeout'];

    function ListController($scope, Products, $timeout) {
        var top,
            busyLoading = false,
            skip,
            inc = 0,
            currentCategory = null,
            currentSearchQuery = "";

        resetInc();
        $scope.$watch(function () { return $(window).width(); }, resetInc);

        $scope.columns = [];
        $scope.products = [];
        $scope.categories = [];
        $scope.searchQuery = '';

        //$scope.$watchCollection('products', function () {
        //    //$scope.$apply();
        //});

        if (!$scope.products.length) {
            Products.categories().then(categoriesSuccessFn, categoriesErrorFn);
            Products.all({skip: 0, top: top}).then(productsSuccessFn, productsErrorFn);
        }

        $scope.loadMore = function () {
            if (!busyLoading) {
                busyLoading = true;
                skip += inc;
                Products.all({freetext: currentSearchQuery, skip: skip, top: top, categoryid: currentCategory}).then(productsSuccessFn, productsErrorFn).then(function () {
                    busyLoading = false;
                });
            }
        };

        $scope.filter = function () {
            resetInc();
            currentSearchQuery = $scope.searchQuery;
            Products.all({freetext: $scope.searchQuery, top: top, skip: skip, categoryid: currentCategory}).then(filterSuccessFn, productsErrorFn).then(function () {
                console.log('finished')
            });
        };

        $scope.filterByCategory = function (id) {
            currentCategory = id;
            Products.all({freetext: currentSearchQuery, top: top, skip: skip, categoryid: currentCategory}).then(filterSuccessFn, productsErrorFn).then(function () {
                console.log('finished')
            });
        };

        function categoriesSuccessFn(data, status, headers, config) {
            $scope.categories = data.data;
            console.log('categories data');
            console.log(data.data);
        }

        function categoriesErrorFn(data, status, headers, config) {
            console.log('error categories loading');
        }

        function productsSuccessFn(data, status, headers, config) {
            for (var i = 0; i < data.data.length; i++) {
                console.log('pushing...');
                console.log(data.data[i]);
                console.log($scope.products);
                $scope.products.push(data.data[i]);
            }
        }

        function filterSuccessFn(data, status, headers, config) {
            $scope.products = data.data;
        }

        function productsErrorFn(data, status, headers, config) {
            console.log('error all loading');
        }

        function resetInc(){
            if ($(window).width()>=1200) {
                top = 6;
                inc = 6;
            } else if ($(window).width()>992) {
                top = 4;
                inc = 4;
            } else {
                top = 2;
                inc = 2;
            }
            skip = 0;
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