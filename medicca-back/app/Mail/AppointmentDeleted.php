<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AppointmentDeleted extends Mailable
{
    use Queueable, SerializesModels;

    public $pacienteName;
    public $medicoName;
    public $appointmentDate;

    /**
     * Create a new message instance.
     */
    public function __construct($pacienteName, $medicoName, $appointmentDate)
    {
        $this->pacienteName = $pacienteName;
        $this->medicoName = $medicoName;
        $this->appointmentDate = $appointmentDate;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Consulta desmarcada',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.appointment-deleted',
            with: [
                'appointmentDate' => $this->appointmentDate,
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
