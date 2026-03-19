<?php

namespace Database\Factories;

use App\Models\Tcg;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Tcg>
 */
class TcgFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['Pokémon', 'One Piece']),
			'logo_path' => fake()->imageUrl(),
			'description' => fake()->sentence()
        ];
    }
}
