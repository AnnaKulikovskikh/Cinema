<?php

namespace App\Models;

use App\Models\Hall;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    use HasFactory;

    protected $fillable = ['hall_id', 'type_seat'];

    public $timestamps = false;

    public function hall(): BelongsTo
    {
        return $this->belongsTo(Hall::class);
    }
}
