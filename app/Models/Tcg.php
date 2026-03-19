<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Tcg extends Model
{
	use HasFactory;

    protected $fillable = [
        'name',
        'logo_path',
        'description',
    ];

    public function sets(): HasMany
    {
        return $this->hasMany(Set::class);
    }

    public function products(): HasManyThrough
    {
        return $this->hasManyThrough(Product::class, Set::class);
    }
}
