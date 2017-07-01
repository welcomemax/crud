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
            controller: 'itemEditController',
            templateUrl: '../templates/detail.html'
        })
        .when('/new', {
            controller: 'itemNewController',
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


app.controller('itemsListController', function($scope, $http, API_URL) {
    $http.get(API_URL + "items")
        .then(function(response) {
            $scope.items = response.data;
        });

    componentHandler.upgradeAllRegistered();
});

app.controller('itemNewController', function($scope, $http, $httpParamSerializer, API_URL, $location) {
    console.log($scope)

    $scope.save = function() {
        $http({
            method: 'POST',
            url: API_URL + "items",
            data: $httpParamSerializer($scope.item),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response) {
            console.log(response);
            $location.path('/');
        });
    };

    componentHandler.upgradeAllRegistered();
});

app.controller('itemEditController', function($scope, $http, $httpParamSerializer, API_URL, $routeParams, $location) {
    console.log($routeParams.itemId)

    $http.get(API_URL + "items/" + $routeParams.itemId)
        .then(function(response) {
            $scope.item = response.data;
            console.log(response.data)
        });

    $scope.save = function() {
        $http({
            method: 'POST',
            url: API_URL + "items/" + $scope.item.id,
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
            url: API_URL + 'items/' + $scope.item.id
        }).then(function(response) {
            console.log(response);
            $location.path('/');
        });
    };

    componentHandler.upgradeAllRegistered();
});