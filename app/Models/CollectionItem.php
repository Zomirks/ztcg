<?php

namespace App\Models;

use App\Enums\ProductCondition;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CollectionItem extends Model
{
    protected $fillable = [
        'quantity',
        'user_id',
        'product_id',
        'purchase_price',
        'notes',
        'purchase_date',
        'product_condition',
    ];

    protected function casts(): array
    {
        return [
            'product_condition' => ProductCondition::class,
        ];
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
