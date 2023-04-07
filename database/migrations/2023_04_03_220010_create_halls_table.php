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
        Schema::create('halls', function (Blueprint $table) {
            $table->id();
            $table->string('name')->default('New hall');
            $table->integer('width')->default(20);
            $table->integer('heigth')->default(10);
            $table->json('seats');
            //$table->set('seats', ['usual','vip','busy','no']);
            $table->integer('price');
            $table->integer('price_vip');
            $table->timestamps();
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
