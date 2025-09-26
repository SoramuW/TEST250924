<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TodoController;

Route::get('/health', function () {
    return response()->json(['status'=>'ok','time'=>now()]);
});

Route::apiResource('todos', TodoController::class)->only([
    'index', 'store', 'update', 'destroy'
]);