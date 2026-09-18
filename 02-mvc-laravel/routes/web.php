<?php

use App\Http\Controllers\ProdutoController;
use Illuminate\Support\Facades\Route;

// ROTAS: mapeiam uma URL para um método do Controller.
// A rota não sabe montar HTML nem consultar o banco — ela só direciona.

Route::get('/', [ProdutoController::class, 'index']);
Route::get('/produtos/{id}', [ProdutoController::class, 'show']);
