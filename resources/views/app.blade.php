<!doctype html>
<html lang="{{ app()->getLocale() }}"  ng-app="project">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>CRUD</title>

        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-resource.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-route.min.js"></script>
        <script src="https://cdn.firebase.com/js/client/2.0.4/firebase.js"></script>
        <script src="https://cdn.firebase.com/libs/angularfire/0.9.0/angularfire.min.js"></script>

<!--        <link rel="stylesheet" href="./node_modules/material-design-lite/material.min.css">-->
<!--        <script src="./node_modules/material-design-lite/material.min.js"></script>-->

        <link rel="stylesheet" href="{{asset('css/app.css')}}">
        <script src="{{asset('js/app.js')}}"></script>
        <script src="js/project-list.js"></script>
    </head>
    <body>
        <div class="wrapper">
            <div ng-view></div>
        </div>
    </body>
</html>
