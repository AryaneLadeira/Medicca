<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Consulta;
use App\Models\User;
use App\Mail\AppointmentCreated;
use App\Mail\AppointmentEdited;
use App\Mail\AppointmentDeleted;
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
        $userId = $this->getUserIdFromRequest($request);
        $user = $this->findUserOrFail($userId);

        $consultas = $this->getConsultasForUser($user);
        $appointmentData = $this->formatAppointments($consultas);

        return response()->json($appointmentData);
    }

    private function getUserIdFromRequest(Request $request)
    {
        return $request->query('user_id');
    }

    private function findUserOrFail($userId)
    {
        return User::findOrFail($userId);
    }

    private function getConsultasForUser($user)
    {
        return Consulta::with(['paciente.user', 'medico.user', 'medico.especialidade'])
            ->when($this->isPaciente($user), fn ($query) => $this->filterConsultasByPaciente($query, $user))
            ->when($this->isMedico($user), fn ($query) => $this->filterConsultasByMedico($query, $user))
            ->orderBy('consultation_date', 'desc')
            ->get();
    }

    private function isPaciente($user)
    {
        return $user->type() == 'paciente';
    }

    private function isMedico($user)
    {
        return $user->type() == 'medico';
    }

    private function filterConsultasByPaciente($query, $user)
    {
        return $query->where('paciente_id', $user->paciente->id);
    }

    private function filterConsultasByMedico($query, $user)
    {
        return $query->where('medico_id', $user->medico->id);
    }

    private function formatAppointments($consultas)
    {
        $consultasCount = $this->getConsultasCount($consultas);

        return $consultas->map(fn ($consulta) => $this->formatSingleAppointment($consulta, $consultasCount));
    }

    private function getConsultasCount($consultas)
    {
        return $consultas->groupBy(fn ($consulta) => $consulta->paciente_id . '-' . $consulta->medico_id)
            ->map(fn ($group) => $group->count());
    }

    private function formatSingleAppointment($consulta, $consultasCount)
    {
        $key = $consulta->paciente_id . '-' . $consulta->medico_id;

        return [
            'id' => $consulta->id,
            'consultation_date' => $this->formatDate($consulta->consultation_date),
            'consultation_time' => $this->formatTime($consulta->consultation_date),
            'appointments_count' => $consultasCount[$key],
            'doctor' => $this->formatDoctor($consulta),
            'patient' => $this->formatPatient($consulta),
        ];
    }

    private function formatDate($date)
    {
        return \Carbon\Carbon::parse($date)->format('d/m/Y');
    }

    private function formatTime($date)
    {
        return \Carbon\Carbon::parse($date)->format('H:i');
    }

    private function formatDoctor($consulta)
    {
        return [
            'id' => $consulta->medico->id,
            'name' => $consulta->medico->user->name ?? null,
            'crm' => $consulta->medico->crm,
            'specialty' => $this->formatSpecialty($consulta),
        ];
    }

    private function formatSpecialty($consulta)
    {
        return [
            'id' => $consulta->medico->especialidade->id,
            'name' => $consulta->medico->especialidade->name,
        ];
    }

    private function formatPatient($consulta)
    {
        return [
            'id' => $consulta->paciente->id,
            'name' => $consulta->paciente->user->name ?? null,
        ];
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

        $this->sendEmailToPatient($paciente, $appointmentDate, $medico);
        $this->sendEmailToDoctor($medico, $appointmentDate, $paciente);
    }

    private function sendEmailToPatient($paciente, $appointmentDate, $medico)
    {
        Mail::to($paciente->user->email)->send(new AppointmentCreated(
            $appointmentDate,
            $paciente->user->name,
            $medico->user->name
        ));
    }

    private function sendEmailToDoctor($medico, $appointmentDate, $paciente)
    {
        Mail::to($medico->user->email)->send(new AppointmentCreated(
            $appointmentDate,
            $paciente->user->name,
            $medico->user->name
        ));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $consulta = Consulta::findOrFail($id);
            $oldAppointmentDate = $this->formatDate($consulta->consultation_date);

            $validatedData = $this->validateUpdateRequest($request);

            if ($this->isSameAppointmentDate($consulta, $validatedData)) {
                return response()->json([
                    'message' => 'A data da consulta não foi alterada.',
                ], 200);
            }

            $consulta->consultation_date = $validatedData['consultation_date'];
            $consulta->save();

            $this->sendUpdatedAppointmentEmail($consulta, $oldAppointmentDate);

            return response()->json([
                'message' => 'Consulta atualizada com sucesso e e-mail enviado!',
                'consulta' => $consulta,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao atualizar consulta.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    private function validateUpdateRequest(Request $request)
    {
        return $request->validate([
            'consultation_date' => 'required|date_format:Y-m-d H:i',
        ]);
    }

    private function isSameAppointmentDate($consulta, $validatedData)
    {
        return $consulta->consultation_date == $validatedData['consultation_date'];
    }

    private function sendUpdatedAppointmentEmail($consulta, $oldAppointmentDate)
    {
        $newAppointmentDate = $this->formatDate($consulta->consultation_date);

        $paciente = $consulta->paciente;
        $medico = $consulta->medico;

        $this->sendEmailToPatient($paciente, $newAppointmentDate, $medico, $oldAppointmentDate);
        $this->sendEmailToDoctor($medico, $newAppointmentDate, $paciente, $oldAppointmentDate);
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy(string $id)
    {
        try {
            $consulta = Consulta::findOrFail($id);

            $paciente = $consulta->paciente;
            $medico = $consulta->medico;
            $appointmentDate = \Carbon\Carbon::parse($consulta->consultation_date)->format('d/m/Y H:i');

            $consulta->delete();

            Mail::to($paciente->user->email)->send(new AppointmentDeleted(
                $paciente->user->name,
                $medico->user->name,
                $appointmentDate
            ));
            Mail::to($medico->user->email)->send(new AppointmentDeleted(
                $paciente->user->name,
                $medico->user->name,
                $appointmentDate
            ));

            return response()->json(['message' => 'Consulta deletada com sucesso e e-mails enviados.']);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao deletar consulta.',
                'message' => $e->getMessage(),
            ], 500);
        }
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



}
