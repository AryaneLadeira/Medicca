<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Consulta;

class ConsultaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $consultas = Consulta::with(['paciente', 'medico'])->get();
        return response()->json($consultas);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Caso seja necessário, retorne uma view para criação de consultas.
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'paciente_id' => 'required|exists:pacientes,id',
            'medico_id' => 'required|exists:medicos,id',
            'data_consulta' => 'required|date',
            'data_agendamento' => 'required|date',
        ]);

        $consulta = Consulta::create($validated);
        return response()->json($consulta, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $consulta = Consulta::with(['paciente', 'medico'])->findOrFail($id);
        return response()->json($consulta);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Caso seja necessário, retorne uma view para edição de consultas.
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $consulta = Consulta::findOrFail($id);

        $validated = $request->validate([
            'paciente_id' => 'nullable|exists:pacientes,id',
            'medico_id' => 'nullable|exists:medicos,id',
            'data_consulta' => 'nullable|date',
            'data_agendamento' => 'nullable|date',
        ]);

        $consulta->update($validated);
        return response()->json($consulta);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $consulta = Consulta::findOrFail($id);
        $consulta->delete();
        return response()->json(['message' => 'Consulta deletada com sucesso']);
    }
}
