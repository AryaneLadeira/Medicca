<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveConsultationTimeFromConsultas extends Migration
{
    /**
     * Execute as modificações na tabela.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('consultas', function (Blueprint $table) {
            $table->dropColumn('consultation_time');
            $table->dateTime('consultation_date')->change();
        });
    }

    /**
     * Reverte as modificações feitas pela migração.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('consultas', function (Blueprint $table) {
            $table->time('consultation_time')->nullable();
            $table->date('consultation_date')->change();
        });
    }
}
