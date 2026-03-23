<?php

namespace Database\Factories;

use App\Enums\Language;
use App\Enums\ProductType;
use App\Models\Product;
use App\Models\Set;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(4, true),
            'base_price' => fake()->randomFloat(2, 15, 250),
            'product_type' => fake()->randomElement(ProductType::cases()),
            'language' => fake()->randomElement(Language::cases()),
            'release_date' => fake()->date(),
            'set_id' => Set::factory(),
        ];
    }
}
