<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSetRequest;
use App\Http\Requests\UpdateSetRequest;
use App\Models\Set;
use App\Models\Tcg;
use Illuminate\Http\Request;
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
        $sets = Set::with('tcg')->get();

        return Inertia::render('sets/create', [
            'sets' => $sets,
            'tcgs' => Tcg::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSetRequest $request)
    {
        Set::create($request->validated());

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
        if ($request->user()->cannot('update', $set)) {
            abort(403);
        }

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
        if ($request->user()->cannot('update', $set)) {
            abort(403);
        }
        $set->update($request->validated());

        return redirect()
            ->route('sets.index')
            ->with('success', 'Set modifié avec succès !');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Set $set)
    {
        if ($request->user()->cannot('delete', $set)) {
            abort(403);
        }

        $set->delete();

        return redirect()
            ->route('sets.index')
            ->with('success', 'Le set a bien été supprimé !');
    }
}
