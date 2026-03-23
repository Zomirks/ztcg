<?php

namespace App\Models;

use App\Enums\Language;
use App\Enums\ProductType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'release_date',
        'base_price',
        'product_type',
        'language',
        'set_id',
    ];

    protected function casts(): array
    {
        return [
            'product_type' => ProductType::class,
            'language' => Language::class,
        ];
    }

    public function set(): BelongsTo
    {
        return $this->belongsTo(Set::class);
    }

    public function collectionItems(): HasMany
    {
        return $this->hasMany(CollectionItem::class);
    }
}
