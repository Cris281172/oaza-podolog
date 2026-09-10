<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $fillable = ['title', 'image_path', 'thumbnail_path', 'order'];
}
