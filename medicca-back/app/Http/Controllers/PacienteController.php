<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use App\Models\User;
use Illuminate\Http\Request;

class PacienteController extends Controller
{
    /**
     * Store a newly created paciente in storage.
     */

    public function index()
    {
        $pacientes = Paciente::with('user')->get();

        return response()->json($pacientes);
    }

    public function store(Request $request)
{
    try {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'cpf' => 'required|string|unique:users,cpf',
            'cep' => 'required|string|size:8',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:5',
            'address' => 'required|string',
            'phone' => 'required|string',
            'registration_date' => 'required|date',
            'birth_date' => 'required|date',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'cpf' => $validated['cpf'],
            'cep' => $validated['cep'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'address' => $validated['address'],
            'phone' => $validated['phone'],
        ]);

        $paciente = Paciente::create([
            'user_id' => $user->id,
            'registration_date' => $validated['registration_date'],
            'birth_date' => $validated['birth_date'],
        ]);

        return response()->json($paciente, 201);

    } catch (\Exception $e) {
        \Log::error('Erro ao criar paciente: ' . $e->getMessage());

        return response()->json([
            'error' => 'Erro ao criar o paciente.',
            'message' => $e->getMessage()
        ], 500);
    }
}


    public function show(string $id)
    {
        $paciente = Paciente::with('user')->findOrFail($id);

        return response()->json($paciente);
    }

    /**
     * Update the specified paciente in storage.
     */
    public function update(Request $request, string $id)
    {
        $paciente = Paciente::findOrFail($id);

        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'cpf' => 'nullable|string|unique:users,cpf,' . $paciente->user_id,
            'cep' => 'nullable|string|size:8',
            'address' => 'nullable|string',
            'phone' => 'nullable|string',
            'registration_date' => 'nullable|date',
            'birth_date' => 'nullable|date',
        ]);

        $paciente->user->update($validated);

        $paciente->update($validated);

        return response()->json($paciente);
    }


    public function destroy(string $id)
    {
        $paciente = Paciente::findOrFail($id);
        $paciente->user->delete(); // Excluir o usuário também
        $paciente->delete();

        return response()->json(['message' => 'Paciente deletado com sucesso']);
    }
}
