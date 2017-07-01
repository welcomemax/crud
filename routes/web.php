<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('app');
});

Route::get('/api/items/{id?}', 'ItemController@index');
Route::post('/api/items', 'ItemController@store');
Route::post('/api/items/{id}', 'ItemController@update');
Route::delete('/api/items/{id}', 'ItemController@destroy');