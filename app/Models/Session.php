<?php

namespace App\Models;
use App\Models\Movie;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $fillable = ['start', 'hall_id', 'movie_id'];

    public function movies()
    {
        return $this->hasMany(Movie::class);
    }
}
