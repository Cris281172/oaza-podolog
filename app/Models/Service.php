<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'short_description',
        'page_intro',
        'description_heading',
        'page_content',
        'seo_title',
        'seo_description',
        'order',
        'category_id',
    ];

    protected $casts = [
        'page_content' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(ServiceCategory::class);
    }
}
