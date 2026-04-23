<?php

namespace App\Http\Controllers;

use App\Enums\Language;
use App\Enums\ProductType;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Models\Set;
use App\Models\Tcg;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('set.tcg')->get();

        return Inertia::render('products/index', array_merge(
            ['products' => $products],
            $this->enumProps(),
        ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Product::class);

        return Inertia::render('products/create', array_merge(
            [
                'sets' => Set::with('tcg')->orderBy('release_date', 'desc')->get(),
                'tcgs' => Tcg::all(),
            ],
            $this->enumProps(),
        ));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $this->authorize('create', Product::class);

        $data = $request->safe()->except(['image']);
        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('product-images', 'public');
        }
        Product::create($data);

        return redirect()
            ->route('products.index')
            ->with('success', 'Le nouveau produit a bien été ajouté !');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Product $product)
    {
        $this->authorize('update', $product);

        $product->load('set.tcg');

        return Inertia::render('products/edit', array_merge(
            [
                'product' => $product,
                'sets' => Set::with('tcg')->orderBy('release_date', 'desc')->get(),
                'tcgs' => Tcg::all(),
            ],
            $this->enumProps(),
        ));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $this->authorize('update', $product);
        $data = $request->safe()->except(['image']);

        if ($request->hasFile('image') || $request->boolean('remove_image')) {
            if ($product->image_path) {
                Storage::disk('public')->delete($product->image_path);
            }

            $data['image_path'] = $request->file('image')
                ? $request->file('image')->store('product-images', 'public')
                : null;
        }

        $product->update($data);

        return redirect()
            ->route('products.index')
            ->with('success', 'Produit modifié avec succès !');
    }

    private function enumProps(): array
    {
        return [
            'productTypes' => collect(ProductType::cases())->map(fn ($case) => [
                'value' => $case->value,
                'label' => $case->label(),
            ]),
            'languages' => collect(Language::cases())->map(fn ($case) => [
                'value' => $case->value,
                'label' => $case->label(),
            ]),
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Product $product)
    {
        $this->authorize('delete', $product);
        $product->delete();

        return redirect()
            ->route('products.index')
            ->with('success', 'Produit supprimé avec succès !');
    }
}
