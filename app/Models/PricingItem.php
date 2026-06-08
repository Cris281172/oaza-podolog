<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PricingItem extends Model
{
    protected $fillable = ['name', 'price', 'order', 'pricing_id'];
}
