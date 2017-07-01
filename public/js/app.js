/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__) {

"use strict";

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

//require('./bootstrap');

//require('./angular');
//import 'material-design-lite/dist/material.min.js';

angular.module('project', ['ngRoute', 'firebase']).value('fbURL', 'https://ng-projects-list.firebaseio.com/').service('fbRef', function (fbURL) {
    return new Firebase(fbURL);
}).service('fbAuth', function ($q, $firebase, $firebaseAuth, fbRef) {
    var auth;
    return function () {
        if (auth) return $q.when(auth);
        var authObj = $firebaseAuth(fbRef);
        if (authObj.$getAuth()) {
            return $q.when(auth = authObj.$getAuth());
        }
        var deferred = $q.defer();
        authObj.$authAnonymously().then(function (authData) {
            auth = authData;
            deferred.resolve(authData);
        });
        return deferred.promise;
    };
}).service('Projects', function ($q, $firebase, fbRef, fbAuth, projectListValue) {
    var self = this;
    this.fetch = function () {
        if (this.projects) return $q.when(this.projects);
        return fbAuth().then(function (auth) {
            var deferred = $q.defer();
            var ref = fbRef.child('projects-fresh/' + auth.auth.uid);
            var $projects = $firebase(ref);
            ref.on('value', function (snapshot) {
                if (snapshot.val() === null) {
                    $projects.$set(projectListValue);
                }
                self.projects = $projects.$asArray();
                deferred.resolve(self.projects);
            });

            //Remove projects list when no longer needed.
            ref.onDisconnect().remove();
            return deferred.promise;
        });
    };
}).config(function ($routeProvider) {
    var resolveProjects = {
        projects: function projects(Projects) {
            return Projects.fetch();
        }
    };

    $routeProvider.when('/', {
        controller: 'ProjectListController as projectList',
        templateUrl: 'templates/list.html',
        resolve: resolveProjects
    }).when('/edit/:projectId', {
        controller: 'EditProjectController as editProject',
        templateUrl: 'templates/detail.html',
        resolve: resolveProjects
    }).when('/new', {
        controller: 'NewProjectController as editProject',
        templateUrl: 'templates/detail.html',
        resolve: resolveProjects
    }).otherwise({
        redirectTo: '/'
    });
}).config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix(''); // remove percent-encoding for the forward-slash
}]).controller('ProjectListController', function (projects) {
    var projectList = this;
    projectList.projects = projects;

    componentHandler.upgradeAllRegistered(); // Processing dynamically added elements MDL
}).controller('NewProjectController', function ($location, projects) {
    var editProject = this;
    editProject.save = function () {
        projects.$add(editProject.project).then(function (data) {
            $location.path('/');
        });
    };

    componentHandler.upgradeAllRegistered(); // Processing dynamically added elements MDL
}).controller('EditProjectController', function ($location, $routeParams, projects) {
    var editProject = this;
    var projectId = $routeParams.projectId,
        projectIndex;

    editProject.projects = projects;
    projectIndex = editProject.projects.$indexFor(projectId);
    editProject.project = editProject.projects[projectIndex];

    editProject.destroy = function () {
        editProject.projects.$remove(editProject.project).then(function (data) {
            $location.path('/');
        });
    };

    editProject.save = function () {
        editProject.projects.$save(editProject.project).then(function (data) {
            $location.path('/');
        });
    };

    componentHandler.upgradeAllRegistered(); // Processing dynamically added elements MDL
});

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);