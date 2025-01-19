<?php

use App\Http\Controllers\ConsultaController;
use App\Http\Controllers\TelefoneController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\MedicoController;
use App\Http\Controllers\EspecialidadeController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

Route::get('consultas/detalhes', [ConsultaController::class, 'appointmentsSummary']);

Route::apiResource('consultas', ConsultaController::class);

Route::apiResource('telefones', TelefoneController::class);

Route::apiResource('pacientes', PacienteController::class);

Route::apiResource('medicos', MedicoController::class);

Route::apiResource('especialidades', EspecialidadeController::class);

Route::post('login', [LoginController::class, 'authenticate']);

Route::post('logout', [LoginController::class, 'logout'])->middleware('auth');
