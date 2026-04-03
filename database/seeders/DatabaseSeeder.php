<?php

namespace Database\Seeders;

use App\Models\CollectionItem;
use App\Models\Product;
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

        [$megaEvo, $flamFantasma, $herosTrans, $equiParf, $ecarVio, $evoPaldea, $flamObsi] = $pokemon->sets()->createMany([
            ['name' => 'Méga-Évolution', 'code' => 'MEG'],
            ['name' => 'Flammes Fantasmagoriques', 'code' => 'PFL'],
            ['name' => 'Héros Transcendants', 'code' => 'ASC'],
            ['name' => 'Équilibre Parfait', 'code' => 'POR'],
            ['name' => 'Écarlate et Violet', 'code' => 'SVI'],
            ['name' => 'Évolutions à Paldea', 'code' => 'PAL'],
            ['name' => 'Flammes Obsidiennes', 'code' => 'OBF'],
        ]);

        [$op10, $op11, $op12, $op13, $op14, $op15] = $onePiece->sets()->createMany([
            ['name' => 'Sang Royal', 'code' => 'OP-10'],
            ['name' => "Des poings vifs comme l'éclair", 'code' => 'OP-11'],
            ['name' => "L'héritage du maître", 'code' => 'OP-12'],
            ['name' => 'Successeurs', 'code' => 'OP-13'],
            ['name' => "Les sept de la mer d'azur", 'code' => 'OP-14'],
            ['name' => "Aventure sur l'île de Dieu", 'code' => 'OP-15'],
        ]);

        foreach ([$megaEvo, $flamFantasma, $herosTrans, $equiParf, $ecarVio, $evoPaldea, $flamObsi] as $set) {
            Product::factory()->etb()->create(['set_id' => $set->id]);
            Product::factory()->display()->create(['set_id' => $set->id, 'base_price' => 189.99]);
        }

        foreach ([$op10, $op11, $op12, $op13, $op14, $op15] as $set) {
            Product::factory()->display()->create(['set_id' => $set->id, 'base_price' => 134.99]);
        }

        $products = Product::factory()->count(12)->sequence(
            ['set_id' => $megaEvo->id],
            ['set_id' => $flamFantasma->id],
            ['set_id' => $herosTrans->id],
            ['set_id' => $evoPaldea->id],
            ['set_id' => $op10->id],
            ['set_id' => $op12->id],
            ['set_id' => $op14->id],
            ['set_id' => $op15->id],
        )->create();

        CollectionItem::factory()
            ->count(10)
            ->sequence(fn () => [
                'product_id' => $products->random()->id,
            ])
            ->create(['user_id' => $user->id]);
    }
}
