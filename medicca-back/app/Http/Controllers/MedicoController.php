<?php

namespace App\Http\Controllers;

use App\Models\Medico;
use App\Models\User;
use App\Models\Especialidade;
use Illuminate\Http\Request;

class MedicoController extends Controller
{


    public function index()
    {
        $medicos = Medico::with('user')->get();

        return response()->json($medicos);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'cpf' => 'required|string|unique:users,cpf',
            'cep' => 'required|string|size:8',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:5',
            'endereco' => 'required|string',
            'numero' => 'required|string',
            'crm' => 'required|string|unique:medicos,crm',
            'especialidade_id' => 'required|exists:especialidades,id',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'cpf' => $validated['cpf'],
            'cep' => $validated['cep'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'endereco' => $validated['endereco'],
            'numero' => $validated['numero'],
        ]);

        $medico = Medico::create([
            'user_id' => $user->id,
            'crm' => $validated['crm'],
            'especialidade_id' => $validated['especialidade_id'],
        ]);

        return response()->json($medico, 201);
    }

    public function show(string $id)
    {
        $medico = Medico::with('user')->findOrFail($id);

        return response()->json($medico);
    }

    public function update(Request $request, string $id)
    {
        $medico = Medico::findOrFail($id);

        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'cpf' => 'nullable|string|unique:users,cpf,' . $medico->user_id,
            'cep' => 'nullable|string|size:8',
            'endereco' => 'nullable|string',
            'numero' => 'nullable|string',
            'crm' => 'nullable|string|unique:medicos,crm,' . $medico->id,
            'especialidade_id' => 'nullable|exists:especialidades,id',
        ]);

        $medico->user->update($validated);

        $medico->update($validated);

        return response()->json($medico);
    }


    public function destroy(string $id)
    {
        $medico = Medico::findOrFail($id);
        $medico->user->delete();
        $medico->delete();

        return response()->json(['message' => 'Médico deletado com sucesso']);
    }
}
