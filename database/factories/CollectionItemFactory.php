<?php

namespace Database\Factories;

use App\Enums\ProductCondition;
use App\Models\CollectionItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CollectionItem>
 */
class CollectionItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'quantity' => fake()->numberBetween(1, 5),
            'purchase_price' => fake()->randomFloat(2, 10, 300),
            'purchase_date' => fake()->date(),
            'product_condition' => fake()->randomElement(ProductCondition::cases()),
            'notes' => fake()->optional()->sentence(),
            'product_id' => Product::factory(),
            'user_id' => User::factory(),
        ];
    }
}
