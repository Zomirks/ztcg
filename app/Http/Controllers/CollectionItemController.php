<?php

namespace App\Http\Controllers;

use App\Enums\ProductCondition;
use App\Http\Requests\StoreCollectionItemRequest;
use App\Http\Requests\UpdateCollectionItemRequest;
use App\Models\CollectionItem;
use App\Models\Product;
use App\Models\Tcg;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CollectionItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $items = $request->user()
            ->collectionItems()
            ->with('product.set.tcg')
            ->latest()
            ->get();

        return Inertia::render('collection-items/index', [
            'items' => $items,
            'productConditions' => collect(ProductCondition::cases())->map(fn ($case) => [
                'value' => $case->value,
                'label' => $case->label(),
            ]),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::with('set.tcg')->get();

        return Inertia::render('collection-items/create', [
            'products' => $products,
            'productConditions' => collect(ProductCondition::cases())->map(fn ($case) => [
                'value' => $case->value,
                'label' => $case->label(),
            ]),
            'tcgs' => Tcg::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCollectionItemRequest $request)
    {
        if ($request->user()->cannot('create', CollectionItem::class)) {
            abort(403);
        }
        $request->user()->collectionItems()->create($request->validated());

        return redirect()
            ->route('collection-items.index')
            ->with('success', 'Produit ajouté à votre collection !');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, CollectionItem $collectionItem)
    {
        if ($request->user()->cannot('update', $collectionItem)) {
            abort(403);
        }

        $collectionItem->load('product.set.tcg');
        $products = Product::with('set.tcg')->get();

        return Inertia::render('collection-items/edit', [
            'products' => $products,
            'collection_item' => $collectionItem,
            'productConditions' => collect(ProductCondition::cases())->map(fn ($case) => [
                'value' => $case->value,
                'label' => $case->label(),
            ]),
            'tcgs' => Tcg::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCollectionItemRequest $request, CollectionItem $collectionItem)
    {
        if ($request->user()->cannot('update', $collectionItem)) {
            abort(403);
        }
        $collectionItem->update($request->validated());

        return redirect()
            ->route('collection-items.index')
            ->with('success', 'Produit modifié de votre collection !');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, CollectionItem $collectionItem)
    {
        if ($request->user()->cannot('delete', $collectionItem)) {
            abort(403);
        }
        $collectionItem->delete();

        return redirect()
            ->route('collection-items.index')
            ->with('success', 'Produit supprimé de votre collection !');
    }
}
