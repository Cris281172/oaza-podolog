<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('faqs', function (Blueprint $table) {
            $table->boolean('show_on_home')->default(false)->after('order');
            $table->unsignedInteger('home_order')->nullable()->after('show_on_home');
        });

        DB::table('faqs')->orderBy('order')->limit(5)->get(['id'])
            ->each(fn ($faq, int $index) => DB::table('faqs')->where('id', $faq->id)->update([
                'show_on_home' => true,
                'home_order' => $index,
            ]));
    }

    public function down(): void
    {
        Schema::table('faqs', function (Blueprint $table) {
            $table->dropColumn(['show_on_home', 'home_order']);
        });
    }
};
