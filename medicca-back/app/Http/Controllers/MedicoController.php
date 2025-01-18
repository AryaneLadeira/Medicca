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
        $medicos = Medico::join('users', 'medicos.user_id', '=', 'users.id')
            ->join('especialidades', 'medicos.especialidade_id', '=', 'especialidades.id')
            ->select(
                'medicos.id',
                'medicos.user_id',
                'medicos.crm',
                'users.name as name',
                'especialidades.id as especialidade_id',
                'especialidades.name as especialidade_name'
            )
            ->orderBy('users.name', 'asc')
            ->get();

        return response()->json($medicos->map(function ($medico) {
            return [
                'id' => $medico->id,
                'user_id' => $medico->user_id,
                'crm' => $medico->crm,
                'name' => $medico->name,
                'specialty' => [
                    'id' => $medico->especialidade_id,
                    'name' => $medico->especialidade_name,
                ],
            ];
        }));
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
                'crm' => 'required|string|unique:medicos,crm',
                'especialidade_id' => 'required|exists:especialidades,id',
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

            $medico = Medico::create([
                'user_id' => $user->id,
                'crm' => $validated['crm'],
                'especialidade_id' => $validated['especialidade_id'],
            ]);

            return response()->json($medico, 201);

        } catch (\Exception $e) {
            \Log::error('Erro ao criar médico: ' . $e->getMessage());

            return response()->json([
                'error' => 'Erro ao criar o médico.',
                'message' => $e->getMessage()
            ], 500);
        }
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
            'address' => 'nullable|string',
            'phone' => 'nullable|string',
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
