<!doctype html>
<html lang="{{ app()->getLocale() }}" ng-app="items">
    <head>
				<link rel="manifest" href="manifest.json">

				<meta name="mobile-web-app-capable" content="yes">
				<meta name="apple-mobile-web-app-capable" content="yes">
				<meta name="application-name" content="rud">
				<meta name="apple-mobile-web-app-title" content="rud">
				<meta name="theme-color" content="#44A08D">
				<meta name="msapplication-navbutton-color" content="#44A08D">
				<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>C.R.U.D.</title>

				<link rel="apple-touch-icon" sizes="57x57" href="/img/favicon/apple-icon-57x57.png">
				<link rel="apple-touch-icon" sizes="60x60" href="/img/favicon/apple-icon-60x60.png">
				<link rel="apple-touch-icon" sizes="72x72" href="/img/favicon/apple-icon-72x72.png">
				<link rel="apple-touch-icon" sizes="76x76" href="/img/favicon/apple-icon-76x76.png">
				<link rel="apple-touch-icon" sizes="114x114" href="/img/favicon/apple-icon-114x114.png">
				<link rel="apple-touch-icon" sizes="120x120" href="/img/favicon/apple-icon-120x120.png">
				<link rel="apple-touch-icon" sizes="144x144" href="/img/favicon/apple-icon-144x144.png">
				<link rel="apple-touch-icon" sizes="152x152" href="/img/favicon/apple-icon-152x152.png">
				<link rel="apple-touch-icon" sizes="180x180" href="/img/favicon/apple-icon-180x180.png">
				<link rel="icon" type="image/png" sizes="192x192"  href="/img/favicon/android-icon-192x192.png">
				<link rel="icon" type="image/png" sizes="32x32" href="/img/favicon/favicon-32x32.png">
				<link rel="icon" type="image/png" sizes="96x96" href="/img/favicon/favicon-96x96.png">
				<link rel="icon" type="image/png" sizes="16x16" href="/img/favicon/favicon-16x16.png">
				<link rel="manifest" href="/img/favicon/manifest.json">
				<meta name="msapplication-TileColor" content="#ffffff">
				<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
				<meta name="theme-color" content="#ffffff">
				
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.blue_grey-red.min.css">

        <link rel="stylesheet" href="{{asset('css/app.css')}}">
				
				<script>
						if ('serviceWorker' in navigator) {
								window.addEventListener('load', function() {
										// navigator.serviceWorker.register('js/sw.js').then(
												// function(registration) {
														// // Registration was successful
														// console.log('ServiceWorker registration successful with scope: ', registration.scope); },
												// function(err) {
														// // registration failed :(
														// console.log('ServiceWorker registration failed: ', err);
										// });
								});
						}
				</script>
    </head>
    <body>
        <div class="wrapper">
            <h1 class="app-header">C.R.U.D.</h1>
            <div ng-view></div>
            <div class="app-note">
                SPA для работы с БД на angular
            </div>
        </div>
				
		
				<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.js"></script>
				<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-route.js"></script>
				
				<script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
				
				<script src="{{asset('js/app.js')}}"></script>
    </body>
</html>
