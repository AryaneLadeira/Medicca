<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'cpf',
        'cep',
        'address',
        'phone',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function type()
    {
        if ($this->medico) {
            return 'medico';
        }

        if ($this->paciente) {
            return 'paciente';
        }

        return 'desconhecido';
    }

    public function medico()
    {
        return $this->hasOne(Medico::class);
    }

    public function paciente()
    {
        return $this->hasOne(Paciente::class);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        $type = $this->type();

        $specificId = null;
        $birthDate = null;

        if ($type === 'medico' && $this->medico) {
            $specificId = $this->medico->id;
        } elseif ($type === 'paciente' && $this->paciente) {
            $specificId = $this->paciente->id;
            $birthDate = $this->paciente->birth_date;
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'type' => $type,
            'specificId' => $specificId,
            'birthDate' => $birthDate,
        ];
    }


}
