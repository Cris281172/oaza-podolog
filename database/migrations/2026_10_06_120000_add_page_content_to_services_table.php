<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->text('page_intro')->nullable()->after('short_description');
            $table->string('description_heading')->nullable()->after('page_intro');
            $table->json('page_content')->nullable()->after('description_heading');
            $table->string('seo_title')->nullable()->after('page_content');
            $table->text('seo_description')->nullable()->after('seo_title');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn([
                'page_intro',
                'description_heading',
                'page_content',
                'seo_title',
                'seo_description',
            ]);
        });
    }
};
