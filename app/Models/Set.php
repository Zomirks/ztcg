<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Set extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'print_code',
        'series',
        'description',
        'logo_path',
        'total_cards',
        'release_date',
        'tcg_id',
    ];

    protected $appends = ['logo_url'];

    public function getLogoUrlAttribute(): ?string
    {
        return $this->logo_path ? Storage::disk('public')->url($this->logo_path) : null;
    }

    public function tcg(): BelongsTo
    {
        return $this->belongsTo(Tcg::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
