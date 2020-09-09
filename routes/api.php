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

/* Facebook login routes */
Route::post('/login', 'Auth\LoginController@facebookLogin');

Route::get('/facebookLoginCallback', 'Auth\LoginController@facebookLoginCallback')->middleware('web');
Route::post('/login/switchToken', 'Auth\LoginController@switchToken');
Route::get('/refresh', 'Auth\LoginController@refresh');

/* User Actions */

Route::group(['middleware' => ['jwt.verify','user.check']], function () {
    Route::get('/profile', 'UserController@getProfileData');
    Route::get('/getSocialData', 'UserController@getSocialData');
    Route::get('/recommended', 'UserController@getRecommendedContent');
    Route::get('/posts', 'PostController@index');
    Route::get('/adposts', 'PostController@showAdposts');
    Route::post('/post', 'PostController@savePost');
    Route::post('/adpost', 'PostController@saveAdPost');
    Route::delete('/post/{post}', 'PostController@deletePost');

    Route::get('/adaccount' , 'UserController@saveAdAccount');
    Route::get('/savefbcategories', 'DataController@storeFbBusinessCategories');
});
