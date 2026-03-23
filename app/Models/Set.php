<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Set extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'tcg_id',
        'release_date',
    ];

    public function tcg(): BelongsTo
    {
        return $this->belongsTo(Tcg::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
