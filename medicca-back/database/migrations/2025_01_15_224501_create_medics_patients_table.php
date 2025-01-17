<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Alterar tabela users existente
        Schema::table('users', function (Blueprint $table) {
            $table->string('cpf')->unique()->nullable()->after('name');
            $table->string('cep')->nullable()->after('cpf');
            $table->string('endereco')->nullable()->after('cep');
            $table->string('numero')->nullable()->after('endereco');
        });

        // Tabela medicos
        Schema::create('medicos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('especialidade_id')->constrained('especialidades')->onDelete('cascade');
            $table->string('crm')->unique();
            $table->timestamps();
        });

        // Tabela pacientes
        Schema::create('pacientes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamp('data_cadastro')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pacientes');
        Schema::dropIfExists('medicos');
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['cpf', 'cep', 'endereco', 'numero']);
        });
    }
};
