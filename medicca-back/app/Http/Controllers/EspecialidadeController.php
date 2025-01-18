<?php

namespace App\Http\Controllers;

use App\Models\Especialidade;
use Illuminate\Http\Request;

class EspecialidadeController extends Controller
{
    public function index()
    {
        $especialidades = Especialidade::all();
        return response()->json($especialidades);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $especialidade = Especialidade::create($validated);

        return response()->json($especialidade, 201);
    }

    public function show(string $id)
    {
        $especialidade = Especialidade::findOrFail($id);

        return response()->json($especialidade);
    }

    public function update(Request $request, string $id)
    {
        $especialidade = Especialidade::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $especialidade->update($validated);

        return response()->json($especialidade);
    }


    public function destroy(string $id)
    {
        $especialidade = Especialidade::findOrFail($id);
        $especialidade->delete();

        return response()->json(['message' => 'Especialidade removida com sucesso.'], 200);
    }
}
