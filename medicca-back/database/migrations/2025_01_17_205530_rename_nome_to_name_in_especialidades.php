<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameNomeToNameInEspecialidades extends Migration
{
    /**
     * Execute as alterações da migration.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('especialidades', function (Blueprint $table) {
            $table->renameColumn('nome', 'name'); // Renomeando a coluna de 'nome' para 'name'
        });
    }

    /**
     * Desfazer as alterações da migration.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('especialidades', function (Blueprint $table) {
            $table->renameColumn('name', 'nome'); // Caso precise reverter a mudança
        });
    }
}
