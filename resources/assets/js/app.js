//require('./bootstrap');

//require('angular');

import 'material-design-lite/dist/material.min.js';

var app = angular.module('items', ["ngRoute"])
    .constant('API_URL', 'http://crud.local/api/');

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'itemsListController',
            templateUrl: '../templates/list.html'
        })
        .when('/edit/:itemId', {
            controller: 'itemDetailController',
            templateUrl: '../templates/detail.html'
        })
        .when('/new', {
            controller: 'itemDetailController',
            templateUrl: '../templates/detail.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});
app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

app.filter('startFrom', function(){
    return function(input, start){
        if (!input || !input.length) return;
        start = +start;
        return input.slice(start);
    }
});

app.controller('itemsListController', function($scope, $http, API_URL, $filter) {
    $http.get(API_URL + "items").then(function(response) {
        $scope.items = response.data;

        $scope.filterItems = $scope.items;
        $scope.currentPage = 0;
        $scope.itemsPerPage = 5;
        $scope.search = '';

        $scope.firstPage = function() {
            return $scope.currentPage == 0;
        };
        $scope.lastPage = function() {
            let lastPageNum = Math.ceil($scope.filterItems.length / $scope.itemsPerPage - 1);
            return $scope.currentPage == lastPageNum;
        };
        $scope.getFilterItems = function(){
            return $filter('filter')($scope.filterItems, $scope.search)
        };
        $scope.numberOfPages = function(){
            return Math.ceil($scope.getFilterItems().length / $scope.itemsPerPage);
        };
        $scope.startingItem = function() {
            return $scope.currentPage * $scope.itemsPerPage;
        };
        $scope.pageBack = function() {
            $scope.currentPage = $scope.currentPage - 1;
        };
        $scope.pageForward = function() {
            $scope.currentPage = $scope.currentPage + 1;
        };
        $scope.$watch('search', function(newValue, oldValue){
            if(oldValue!=newValue){
                $scope.currentPage = 0;
                $scope.filterItems = $filter('filter')($scope.items, $scope.search);
            }
        }, true);

        componentHandler.upgradeAllRegistered();
    });
});

app.controller('itemDetailController', function($scope, $http, $httpParamSerializer, API_URL, $routeParams, $location) {
    const itemId = $routeParams.itemId;
    let url = '';

    if(itemId){
        url = API_URL + "items/" + itemId;
    } else {
        url = API_URL + "items";
    }

    $http.get(url).then(function(response) {
        $scope.item = response.data;
        console.log(response.data)
    });

    $scope.save = function() {
        $http({
            method: 'POST',
            url: url,
            data: $httpParamSerializer($scope.item),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response) {
            console.log(response);
            $location.path('/');
        });
    };

    $scope.delete = function() {
        $http({
            method: 'DELETE',
            url: url
        }).then(function(response) {
            console.log(response);
            $location.path('/');
        });
    };

    componentHandler.upgradeAllRegistered();
});