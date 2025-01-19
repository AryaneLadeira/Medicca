<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AppointmentEdited extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct($oldAppointmentDate, $newAppointmentDate, $pacienteName, $medicoName)
    {
        $this->oldAppointmentDate = $oldAppointmentDate;
        $this->newAppointmentDate = $newAppointmentDate;
        $this->pacienteName = $pacienteName;
        $this->medicoName = $medicoName;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Sua consulta foi reagendada!',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.appointment-edited',
            with: [
                'oldAppointmentDate' => $this->oldAppointmentDate,
                'newAppointmentDate' => $this->newAppointmentDate,
                'pacienteName' => $this->pacienteName,
                'medicoName' => $this->medicoName,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
