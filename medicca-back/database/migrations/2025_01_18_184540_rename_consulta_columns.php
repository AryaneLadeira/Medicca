<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameConsultaColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('consultas', function (Blueprint $table) {
            $table->renameColumn('data_consulta', 'consultation_date');
            $table->renameColumn('data_agendamento', 'appointment_date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('consultas', function (Blueprint $table) {
            $table->renameColumn('consultation_date', 'data_consulta');
            $table->renameColumn('appointment_date', 'data_agendamento');
        });
    }
}
