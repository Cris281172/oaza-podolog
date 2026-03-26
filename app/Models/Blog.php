<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = ['title', 'slug', 'content', 'excerpt', 'is_published'];

    protected $casts = [
        'content' => 'array',
        'isPublished' => 'boolean',
    ];
}
