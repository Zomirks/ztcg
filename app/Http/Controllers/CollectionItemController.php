<?php

namespace App\Http\Controllers;

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
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', CollectionItem::class);
        $products = Product::with('set.tcg')->get();

        return Inertia::render('collection-items/create', [
            'products' => $products,
            'tcgs' => Tcg::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCollectionItemRequest $request)
    {
        $this->authorize('create', CollectionItem::class);
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
        $this->authorize('update', $collectionItem);

        $collectionItem->load('product.set.tcg');
        $products = Product::with('set.tcg')->get();

        return Inertia::render('collection-items/edit', [
            'products' => $products,
            'collection_item' => $collectionItem,
            'tcgs' => Tcg::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCollectionItemRequest $request, CollectionItem $collectionItem)
    {
        $this->authorize('update', $collectionItem);
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
        $this->authorize('delete', $collectionItem);
        $collectionItem->delete();

        return redirect()
            ->route('collection-items.index')
            ->with('success', 'Produit supprimé de votre collection !');
    }
}
