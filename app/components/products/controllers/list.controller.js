(function () {
    'use strict';

    angular
        .module('products.controllers')
        .controller('ListController', ListController);

    ListController.$inject = ['$scope', 'Products', '$rootScope'];

    function ListController($scope, Products, $rootScope) {
        var top,
            busyLoading = false,
            skip,
            inc = 0,
            currentCategory = null,
            currentSearchQuery = ""
            ;

        $scope.columns = [];
        $scope.products = [];
        $scope.categories = [];
        $scope.searchQuery = '';
        $scope.resulstsQty = -1;

        resetInc();
        $scope.$watch(function () { return $(window).width(); }, resetInc);

        if (!$rootScope.firstLoad) {
            restoreCache();
        }

        if (!$scope.products.length) {
            Products.categories().then(categoriesSuccessFn, categoriesErrorFn);
            Products.all({skip: 0, top: top}).then(productsSuccessFn, productsErrorFn);
            $rootScope.firstLoad = false;
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
            //
            });
            Products.all({freetext: $scope.searchQuery, count:1, categoryid: currentCategory}).then(function (data) {
                // getting search results count
                $scope.resulstsQty = parseInt(data.data);
            }, productsErrorFn)
        };

        $scope.filterByCategory = function (id) {
            resetInc();
            currentCategory = id;
            currentSearchQuery = $scope.searchQuery = "";
            Products.all({freetext: currentSearchQuery, top: top, skip: skip, categoryid: currentCategory}).then(filterSuccessFn, productsErrorFn).then(function () {
                //console.log('finished');
            });
        };

        function categoriesSuccessFn(data, status, headers, config) {
            $scope.categories = data.data;
        }

        function categoriesErrorFn(data, status, headers, config) {
            console.error('can not load categories');
        }

        function productsSuccessFn(data, status, headers, config) {
            for (var i = 0; i < data.data.length; i++) {
                $scope.products.push(data.data[i]);
            }
            cacheState();
        }

        function filterSuccessFn(data, status, headers, config) {
            $scope.products = data.data;
            cacheState();
        }

        function productsErrorFn(data, status, headers, config) {
            console.error('can not load products');
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

        function cacheState() {
            window.localStorage.setItem('products', JSON.stringify($scope.products));
            window.localStorage.setItem('categories', JSON.stringify($scope.categories));
        }

        function restoreCache() {
            $scope.products = JSON.parse(window.localStorage.getItem('products'));
            $scope.categories = JSON.parse(window.localStorage.getItem('categories'));
        }

    }
})();