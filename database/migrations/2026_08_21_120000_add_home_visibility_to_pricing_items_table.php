<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pricing_items', function (Blueprint $table) {
            $table->boolean('show_on_home')->default(false)->after('order');
            $table->unsignedInteger('home_order')->nullable()->after('show_on_home');
        });

        DB::table('pricing_items')
            ->orderBy('order')
            ->orderBy('id')
            ->limit(4)
            ->get(['id'])
            ->each(function ($item, $index) {
                DB::table('pricing_items')->where('id', $item->id)->update([
                    'show_on_home' => true,
                    'home_order' => $index,
                ]);
            });
    }

    public function down(): void
    {
        Schema::table('pricing_items', function (Blueprint $table) {
            $table->dropColumn(['show_on_home', 'home_order']);
        });
    }
};
