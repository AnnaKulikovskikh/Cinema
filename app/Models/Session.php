<?php

namespace App\Models;
use App\Models\Movie;
use App\Models\Hall;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $fillable = ['start', 'hall_id', 'movie_id'];
    protected $casts = ['selected_seats' => 'array', 'seance_seats' => 'array'];

    public function movie()
    {
        return $this->belongsTo(Movie::class);
    }

    public function hall()
    {
        return $this->belongsTo(Hall::class);
    }
}
