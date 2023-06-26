<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * $table->integer('session_id');
     * $table->integer('movid_id');
     */
    public function up(): void
    {
        Schema::create('halls', function (Blueprint $table) {
            $table->id();
            $table->string('name')->default('New hall');
            $table->unsignedInteger('rows')->default(2);
            $table->unsegnedInteger('cols')->default(3);
            $table->unsegnedInteger('price')->default(100);
            $table->unsegnedInteger('price_vip')->default(200);
            $table->boolean('is_open')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('halls');
    }
};
