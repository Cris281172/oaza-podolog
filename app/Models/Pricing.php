<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pricing extends Model
{
    protected $fillable = ['title', 'order'];

    public function items(){
        return $this->hasMany(PricingItem::class)->orderBy('order', 'asc');
    }
}
