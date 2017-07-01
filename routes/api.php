<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/api/v1/items/{id?}', 'Items@index');
Route::post('/api/v1/items', 'Items@store');
Route::post('/api/v1/items/{id}', 'Items@update');
Route::delete('/api/v1/items/{id}', 'Items@destroy');