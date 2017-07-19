<!doctype html>
<html lang="{{ app()->getLocale() }}" ng-app="items">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>C.R.U.D.</title>

        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-route.js"></script>

        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.blue_grey-red.min.css">
        <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>

        <link rel="stylesheet" href="{{asset('css/app.css')}}">
        <script src="{{asset('js/app.js')}}"></script>
    </head>
    <body>
        <div class="wrapper">
            <h1 class="app-header">C.R.U.D.</h1>
            <div ng-view></div>
            <div class="app-note">
                SPA для работы с БД на angular
            </div>
        </div>
    </body>
</html>
