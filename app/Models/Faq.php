<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    protected $fillable = ['answer', 'question', 'order', 'show_on_home', 'home_order'];

    protected function casts(): array
    {
        return [
            'show_on_home' => 'boolean',
            'home_order' => 'integer',
        ];
    }
}
