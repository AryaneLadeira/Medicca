<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Consulta;
use App\Models\User;
use App\Mail\AppointmentCreated;
use Illuminate\Support\Facades\Mail;
use App\Models\Paciente;
use App\Models\Medico;


class ConsultaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = $request->query('user_id');
        $user = User::findOrFail($userId);

        $consultas = Consulta::with(['paciente.user', 'medico.user', 'medico.especialidade'])
            ->when($user->type() == 'paciente', function ($query) use ($user) {
                return $query->where('paciente_id', $user->paciente->id);
            })
            ->when($user->type() == 'medico', function ($query) use ($user) {
                return $query->where('medico_id', $user->medico->id);
            })
            ->orderBy('consultation_date', 'desc')
            ->get();

        $appointmentData = $this->formatAppointments($consultas);

        return response()->json($appointmentData);
    }


    public function appointmentsSummary(Request $request)
    {
        $userId = $request->query('user_id');
        $limit = $request->query('limit', 10);
        $user = User::findOrFail($userId);

        $nextAppointment = Consulta::where('consultation_date', '>=', now())
            ->when($user->type() == 'paciente', function ($query) use ($user) {
                return $query->where('paciente_id', $user->paciente->id);
            })
            ->when($user->type() == 'medico', function ($query) use ($user) {
                return $query->where('medico_id', $user->medico->id);
            })
            ->orderBy('consultation_date', 'asc')
            ->first();

        $pastAppointments = Consulta::where('consultation_date', '<', now())
            ->when($user->type() == 'paciente', function ($query) use ($user) {
                return $query->where('paciente_id', $user->paciente->id);
            })
            ->when($user->type() == 'medico', function ($query) use ($user) {
                return $query->where('medico_id', $user->medico->id);
            })
            ->orderBy('consultation_date', 'desc')
            ->take($limit)
            ->get();

        $formattedNextAppointment = $nextAppointment ? $this->formatAppointments(collect([$nextAppointment]))->first() : null;
        $formattedPastAppointments = $this->formatAppointments($pastAppointments);

        return response()->json([
            'next_appointment' => $formattedNextAppointment,
            'past_appointments' => $formattedPastAppointments,
        ]);
    }


    private function formatAppointments($consultas)
    {
        $consultasCount = $consultas->groupBy(function ($consulta) {
            return $consulta->paciente_id . '-' . $consulta->medico_id;
        })->map(function ($group) {
            return $group->count();
        });

        return $consultas->map(function ($consulta) use ($consultasCount) {
            $key = $consulta->paciente_id . '-' . $consulta->medico_id;

            return [
                'id' => $consulta->id,
                'consultation_date' => \Carbon\Carbon::parse($consulta->consultation_date)->format('d/m/Y'),
                'consultation_time' => \Carbon\Carbon::parse($consulta->consultation_date)->format('H:i'),
                'appointments_count' => $consultasCount[$key],
                'doctor' => [
                    'id' => $consulta->medico->id,
                    'name' => $consulta->medico->user->name ?? null,
                    'crm' => $consulta->medico->crm,
                    'specialty' => [
                        'id' => $consulta->medico->especialidade->id,
                        'name' => $consulta->medico->especialidade->name,
                    ],
                ],
                'patient' => [
                    'id' => $consulta->paciente->id,
                    'name' => $consulta->paciente->user->name ?? null,
                ],
            ];
        });
    }

    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $this->validateRequest($request);
        $consulta = $this->createConsulta($validated);
        $this->sendAppointmentEmail($validated, $consulta);

        return response()->json([
            'message' => 'Consulta criada com sucesso e e-mail enviado!',
            'consulta' => $consulta,
        ], 201);
    }

    private function validateRequest(Request $request)
    {
        return $request->validate([
            'paciente_id' => 'required|exists:pacientes,id',
            'medico_id' => 'required|exists:medicos,id',
            'consultation_date' => 'required|date_format:Y-m-d H:i',
        ]);
    }

    private function createConsulta(array $validated)
    {
        $appointmentDate = \Carbon\Carbon::now()->format('Y-m-d H:i');

        return Consulta::create([
            'paciente_id' => $validated['paciente_id'],
            'medico_id' => $validated['medico_id'],
            'consultation_date' => $validated['consultation_date'],
            'appointment_date' => $appointmentDate,
        ]);
    }

    private function sendAppointmentEmail(array $validated, Consulta $consulta)
    {
        $paciente = Paciente::find($validated['paciente_id']);
        $medico = Medico::find($validated['medico_id']);

        $appointmentDate = \Carbon\Carbon::parse($consulta->consultation_date)->format('d/m/Y H:i');

        Mail::to($paciente->user->email)->send(new AppointmentCreated(
            $appointmentDate,
            $paciente->user->name,
            $medico->user->name
        ));

        Mail::to($medico->user->email)->send(new AppointmentCreated(
            $appointmentDate,
            $paciente->user->name,
            $medico->user->name
        ));
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
    public function update(Request $request, $id)
    {
        try {
            $consulta = Consulta::findOrFail($id);
            $validatedData = $request->validate([
                'consultation_date' => 'required|date_format:Y-m-d H:i',
            ]);

            $consulta->consultation_date = $validatedData['consultation_date'];
            $consulta->save();

            return response()->json([
                'message' => 'Consulta atualizada com sucesso!',
                'consulta' => $consulta,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao atualizar consulta.',
                'message' => $e->getMessage(),
            ], 500);
        }
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
