<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Telefone;

class TelefoneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $telefones = Telefone::with('paciente')->get();
        return response()->json($telefones);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Caso seja necessário, retorne uma view para criação de telefones.
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'paciente_id' => 'required|exists:pacientes,id',
            'numero' => 'required|string|max:15',
        ]);

        $telefone = Telefone::create($validated);
        return response()->json($telefone, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $telefone = Telefone::with('paciente')->findOrFail($id);
        return response()->json($telefone);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Caso seja necessário, retorne uma view para edição de telefones.
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $telefone = Telefone::findOrFail($id);

        $validated = $request->validate([
            'paciente_id' => 'nullable|exists:pacientes,id',
            'numero' => 'nullable|string|max:15',
        ]);

        $telefone->update($validated);
        return response()->json($telefone);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $telefone = Telefone::findOrFail($id);
        $telefone->delete();
        return response()->json(['message' => 'Telefone deletado com sucesso']);
    }
}
