<?php

namespace Database\Seeders;

use App\Models\CollectionItem;
use App\Models\Product;
use App\Models\Set;
use App\Models\Tcg;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Zomirks',
            'email' => 'contact@zomirks.fr',
            'password' => 'test',
        ]);

        $pokemon = Tcg::create([
            'name' => 'Pokémon',
            'description' => 'Le jeu de cartes à collectionner Pokémon',
        ]);

        $onePiece = Tcg::create([
            'name' => 'One Piece',
            'description' => 'Le jeu de cartes à collectionner One Piece',
        ]);

        $megaEvo = Set::create([
            'name' => 'Méga-Évolution',
            'code' => 'MEG',
            'tcg_id' => $pokemon->id,
        ]);

        $flamFantasma = Set::create([
            'name' => 'Flammes Fantasmagoriques',
            'code' => 'PFL',
            'tcg_id' => $pokemon->id,
        ]);

        $herosTrans = Set::create([
            'name' => 'Héros Transcendants',
            'code' => 'ASC',
            'tcg_id' => $pokemon->id,
        ]);

        $op10 = Set::create([
            'name' => 'Sang Royal',
            'code' => 'OP-10',
            'tcg_id' => $onePiece->id,
        ]);

        $products = Product::factory()->count(12)->sequence(
            ['set_id' => $megaEvo->id],
            ['set_id' => $flamFantasma->id],
            ['set_id' => $herosTrans->id],
            ['set_id' => $op10->id],
        )->create();

        CollectionItem::factory()
            ->count(10)
            ->sequence(fn () => [
                'product_id' => $products->random()->id,
            ])
            ->create(['user_id' => $user->id]);
    }

    public function etb(): static
    {
        return $this->state(fn (array $attributes) => [
            'product_type' => ProductType::etb,
        ]);
    }

    public function expensive(): static
    {
        return $this->state(fn (array $attributes) => [
            'base_price' => fake()->randomFloat(2, 200, 500),
        ]);
    }
}
