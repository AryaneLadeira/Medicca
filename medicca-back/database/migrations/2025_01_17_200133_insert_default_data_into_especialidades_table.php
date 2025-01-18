<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class InsertDefaultDataIntoEspecialidadesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('especialidades')->insert([
            ['nome' => 'Cardiologia'],
            ['nome' => 'Neurologia'],
            ['nome' => 'Pediatria'],
            ['nome' => 'Ortopedia'],
            ['nome' => 'Dermatologia'],
            ['nome' => 'Ginecologia'],
            ['nome' => 'Oftalmologia'],
            ['nome' => 'Endocrinologia'],
            ['nome' => 'Urologia'],
            ['nome' => 'Psiquiatria'],
            ['nome' => 'Otorrinolaringologia'],
            ['nome' => 'Reumatologia'],
            ['nome' => 'Oncologia'],
            ['nome' => 'Gastroenterologia'],
            ['nome' => 'Infectologia'],
            ['nome' => 'Clínica Geral'],
            ['nome' => 'Radiologia'],
            ['nome' => 'Dermatopatologia'],
            ['nome' => 'Nefrologia'],
            ['nome' => 'Cirurgia Geral'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('especialidades')->whereIn('nome', [
            'Cardiologia',
            'Neurologia',
            'Pediatria',
            'Ortopedia',
            'Dermatologia',
            'Ginecologia',
            'Oftalmologia',
            'Endocrinologia',
            'Urologia',
            'Psiquiatria',
            'Otorrinolaringologia',
            'Reumatologia',
            'Oncologia',
            'Gastroenterologia',
            'Infectologia',
            'Clínica Geral',
            'Radiologia',
            'Dermatopatologia',
            'Nefrologia',
            'Cirurgia Geral',
        ])->delete();
    }
}
