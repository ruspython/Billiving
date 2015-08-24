(function() {
    'use strict';

    angular
        .module('products.controllers')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope'];

    function MainController($scope) {
        $scope.IMAGE_DIR = 'https://billiving-qa.azurewebsites.net/resources/Uploads/4755/';
    }
})();
