const app = angular.module('items', ['ngRoute'])
    .constant('API_URL', '/api/');

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
    return function(input, start) {
        if (!input || !input.length) return;
        start = +start;
        return input.slice(start);
    }
});

app.controller('itemsListController', function($scope, $http, API_URL, $filter) {
    $http.get(API_URL + 'items').then(function(response) {
        $scope.items = response.data;

        $scope.sortType = 'id';
        $scope.sortReverse = false;

        $scope.filterItems = $scope.items;
        $scope.currentPage = 0;
        $scope.itemsPerPage = 5;
        $scope.search = '';

        $scope.toggleSort = function ($event) {
            $scope.sortType = angular.element($event.currentTarget).attr("data-sort");
            $scope.sortReverse = !$scope.sortReverse;

            angular.element(document.querySelectorAll('.sort')).removeClass('asc desc');

            angular.element($event.currentTarget)
                .addClass(['asc','desc'][+ $scope.sortReverse])
                .removeClass(['asc','desc'][+ !$scope.sortReverse]);

            $scope.filterItems = $filter('orderBy')($scope.items, $scope.sortType, $scope.sortReverse);
            console.log($scope.filterItems)
        };

        $scope.firstPage = function() {
            return $scope.currentPage == 0;
        };

        $scope.lastPage = function() {
            let lastPageNum = Math.ceil($scope.filterItems.length / $scope.itemsPerPage - 1);
            return $scope.currentPage == lastPageNum;
        };

        $scope.getFilterItems = function() {
            return $filter('filter')($scope.filterItems, $scope.search)
        };

        $scope.numberOfPages = function() {
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

        $scope.$watch('search', function(newValue, oldValue) {
            if (oldValue != newValue) {
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

    if (itemId) {
        url = API_URL + 'items/' + itemId;
    } else {
        url = API_URL + 'items';
    }

    $http.get(url).then(function(response) {
        $scope.item = response.data;
    });

    $scope.save = function() {
        let fd = new FormData(),
            f = fileInput.files[0];

        fd.append('image', f);
        fd.append('title', $scope.item.title);
        fd.append('price', parseFloat($scope.item.price) || 0);
        fd.append('description', $scope.item.description || '');

        $http.post(url, fd, {
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        }).then(function(response) {
            console.log(response);
            $location.path('/');
        });
    };

    $scope.delete = function() {
        if (confirm('Уверены?')) {
            $http({
                method: 'DELETE',
                url: url
            }).then(function(response) {
                console.log(response);
                $location.path('/');
            });
        }
    };

    $scope.checkDirty = function() {
        // https://github.com/google/material-design-lite/issues/1287
        let nodeList = document.querySelectorAll('.mdl-textfield');

        Array.prototype.forEach.call(nodeList, function (elem) {
            elem.MaterialTextfield.checkDirty();
        });

        angular.element(document.getElementById('title')).parent().removeClass('is-invalid');
    };


    let fileInputTextDiv = document.getElementById('file-input-text-div');
    let fileInput = document.getElementById('file-input-file');
    let fileInputText = document.getElementById('file-input-text');

    fileInput.addEventListener('change', changeInputText);
    fileInput.addEventListener('change', changeState);

    function changeInputText() {
        let str = fileInput.value;
        let i;
        if (str.lastIndexOf('\\')) {
            i = str.lastIndexOf('\\') + 1;
        } else if (str.lastIndexOf('/')) {
            i = str.lastIndexOf('/') + 1;
        }
        fileInputText.value = str.slice(i, str.length);
    }

    function changeState() {
        if (fileInputText.value.length != 0) {
            if (!fileInputTextDiv.classList.contains('is-focused')) {
                fileInputTextDiv.classList.add('is-focused');
            }
        } else {
            if (fileInputTextDiv.classList.contains('is-focused')) {
                fileInputTextDiv.classList.remove('is-focused');
            }
        }
    }

    componentHandler.upgradeAllRegistered();
});