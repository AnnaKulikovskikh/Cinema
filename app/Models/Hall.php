<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hall extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $casts = ['seats' => 'array',];
    protected $fillable = ['name', 'rows', 'cols', 'seats', 'price', 'price_vip' ];
}