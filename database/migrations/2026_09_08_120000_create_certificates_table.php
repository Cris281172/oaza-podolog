<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('image_path');
            $table->string('thumbnail_path');
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        $now = now();
        DB::table('certificates')->insert(collect(range(1, 11))->map(fn (int $number) => [
            'title' => "Certyfikat {$number}",
            'image_path' => "/images/cert-{$number}-lg.webp",
            'thumbnail_path' => "/images/cert-{$number}-sm.webp",
            'order' => $number - 1,
            'created_at' => $now,
            'updated_at' => $now,
        ])->all());
    }

    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
