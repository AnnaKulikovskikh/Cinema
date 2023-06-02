<?php

namespace App\Models;
use App\Models\Session;
use App\Models\Seat;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hall extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = ['name', 'rows', 'cols', 'seats', 'price', 'price_vip', 'is_open' ];

    public function sessions()
    {
        return $this->hasMany(Session::class);
    }

    public function seat()
    {
        return $this->hasMany(Seat::class);
    }
}