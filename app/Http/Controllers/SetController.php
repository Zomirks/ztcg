<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSetRequest;
use App\Http\Requests\UpdateSetRequest;
use App\Models\Set;
use App\Models\Tcg;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sets = Set::with('tcg')->get();

        return Inertia::render('sets/index', [
            'sets' => $sets,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Set::class);

        return Inertia::render('sets/create', [
            'tcgs' => Tcg::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSetRequest $request)
    {
        $this->authorize('create', Set::class);

        $data = $request->safe()->except(['logo']);
        if ($request->hasFile('logo')) {
            $data['logo_path'] = $request->file('logo')->store('set-logos', 'public');
        }
        Set::create($data);

        return redirect()
            ->route('sets.index')
            ->with('success', 'Le nouveau set a bien été ajouté !');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Set $set)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Set $set)
    {
        $this->authorize('update', $set);

        $set->load('tcg');

        return Inertia::render('sets/edit', [
            'set' => $set,
            'tcgs' => Tcg::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSetRequest $request, Set $set)
    {
        $this->authorize('update', $set);
        $data = $request->safe()->except(['logo']);
        if ($request->hasFile('logo')) {
            if ($set->logo_path) {
                Storage::disk('public')->delete($set->logo_path);
            }

            $data['logo_path'] = $request->file('logo')->store('set-logos', 'public');
        }
        $set->update($data);

        return redirect()
            ->route('sets.index')
            ->with('success', 'Set modifié avec succès !');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Set $set)
    {
        $this->authorize('delete', $set);

        $set->delete();

        return redirect()
            ->route('sets.index')
            ->with('success', 'Le set a bien été supprimé !');
    }
}
