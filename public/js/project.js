angular.module('project', ['ngRoute', 'firebase'])

    .value('fbURL', 'https://ng-projects-list.firebaseio.com/')
    .service('fbRef', function(fbURL) {
        return new Firebase(fbURL)
    })
    .service('fbAuth', function($q, $firebase, $firebaseAuth, fbRef) {
        var auth;
        return function () {
            if (auth) return $q.when(auth);
            var authObj = $firebaseAuth(fbRef);
            if (authObj.$getAuth()) {
                return $q.when(auth = authObj.$getAuth());
            }
            var deferred = $q.defer();
            authObj.$authAnonymously().then(function(authData) {
                auth = authData;
                deferred.resolve(authData);
            });
            return deferred.promise;
        }
    })

    .service('Projects', function($q, $firebase, fbRef, fbAuth, projectListValue) {
        var self = this;
        this.fetch = function () {
            if (this.projects) return $q.when(this.projects);
            return fbAuth().then(function(auth) {
                var deferred = $q.defer();
                var ref = fbRef.child('projects-fresh/' + auth.auth.uid);
                var $projects = $firebase(ref);
                ref.on('value', function(snapshot) {
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
    })

    .config(function($routeProvider) {
        var resolveProjects = {
            projects: function (Projects) {
                return Projects.fetch();
            }
        };

        $routeProvider
            .when('/', {
                controller:'ProjectListController as projectList',
                templateUrl:'./public/templates/list.html',
                resolve: resolveProjects
            })
            .when('/edit/:projectId', {
                controller:'EditProjectController as editProject',
                templateUrl:'./public/templates/detail.html',
                resolve: resolveProjects
            })
            .when('/new', {
                controller:'NewProjectController as editProject',
                templateUrl:'./public/templates/detail.html',
                resolve: resolveProjects
            })
            .otherwise({
                redirectTo:'/'
            });
    })
    .config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix(''); // remove percent-encoding for the forward-slash
    }])

    .controller('ProjectListController', function(projects) {
        var projectList = this;
        projectList.projects = projects;

        componentHandler.upgradeAllRegistered(); // Processing dynamically added elements MDL
    })

    .controller('NewProjectController', function($location, projects) {
        var editProject = this;
        editProject.save = function() {
            projects.$add(editProject.project).then(function(data) {
                $location.path('/');
            });
        };

        componentHandler.upgradeAllRegistered(); // Processing dynamically added elements MDL
    })

    .controller('EditProjectController', function($location, $routeParams, projects) {
        var editProject = this;
        var projectId = $routeParams.projectId,
            projectIndex;

        editProject.projects = projects;
        projectIndex = editProject.projects.$indexFor(projectId);
        editProject.project = editProject.projects[projectIndex];

        editProject.destroy = function() {
            editProject.projects.$remove(editProject.project).then(function(data) {
                $location.path('/');
            });
        };

        editProject.save = function() {
            editProject.projects.$save(editProject.project).then(function(data) {
                $location.path('/');
            });
        };

        componentHandler.upgradeAllRegistered(); // Processing dynamically added elements MDL
    });