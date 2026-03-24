<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCollectionItemRequest;
use App\Http\Requests\UpdateCollectionItemRequest;
use App\Models\CollectionItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CollectionItemController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(CollectionItem::class, 'collectionItem');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $items = $request->user()->collectionItems()->with('product.set.tcg')->latest()->get();

        return Inertia::render('CollectionItems/Index', [
            'items' => $items,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::with('set.tcg')->get();

        return Inertia::render('CollectionItems/Create', [
            'products' => $products,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCollectionItemRequest $request)
    {
        $request->user()->collectionItems()->create($request->validated());

        return redirect()
            ->route('collection-items.index')
            ->with('success', 'Produit ajouté à votre collection !');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CollectionItem $collectionItem)
    {
        $collectionItem->load('product.set.tcg');
        $products = Product::with('set.tcg')->get();

        return Inertia::render('CollectionItems/Edit', [
            'products' => $products,
            'collection_item' => $collectionItem,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCollectionItemRequest $request, CollectionItem $collectionItem)
    {
        $collectionItem->update($request->validated());

        return redirect()
            ->route('collection-items.index')
            ->with('success', 'Produit modifié de votre collection !');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CollectionItem $collectionItem)
    {
        $collectionItem->delete();

        return redirect()
            ->route('collection-items.index')
            ->with('success', 'Produit supprimé de votre collection !');
    }
}
