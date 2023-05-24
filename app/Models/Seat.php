<?php

namespace App\Models;
use App\Models\Hall;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    use HasFactory;
    protected $fillable = ['hall_id', 'seats'];
    public $timestamps = false;
    protected $casts = ['seats' => 'array'];

    public function hall()
    {
        return $this->belongsTo(Hall::class);
    }
}
