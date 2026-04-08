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
        Schema::table('sets', function (Blueprint $table) {
            $table->renameColumn('code', 'print_code');
            $table->string('print_code')->nullable()->change();
            $table->string('code')->nullable()->after('name');
            $table->string('logo_path')->nullable();
            $table->string('series')->nullable();
            $table->integer('total_cards')->nullable();
            $table->text('description')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sets', function (Blueprint $table) {
            $table->dropColumn(['code', 'logo_path', 'series', 'total_cards', 'description']);
            $table->renameColumn('print_code', 'code');
        });
    }
};
