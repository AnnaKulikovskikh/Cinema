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
    protected $casts = ['seats' => 'array'];
    protected $fillable = ['name', 'rows', 'cols', 'seats', 'price', 'price_vip' ];

    public function sessions()
    {
        return $this->hasMany(Session::class);
    }

    public function seat()
    {
        return $this->hasOne(Seat::class);
    }
}