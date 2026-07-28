<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = ['name', 'slug', 'short_description', 'order', 'category_id'];

    public function category(){
        return $this->belongsTo(ServiceCategory::class);
    }
}
