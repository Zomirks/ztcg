<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTcgRequest;
use App\Http\Requests\UpdateTcgRequest;
use App\Models\Tcg;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TcgController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tcgs = Tcg::all();

        return Inertia::render('tcgs/index', [
            'tcgs' => $tcgs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('tcgs/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTcgRequest $request)
    {
        if ($request->user()->cannot('create', Tcg::class)) {
            abort(403);
        }

        $data = $request->safe()->except(['logo']);
        if ($request->hasFile('logo')) {
            $data['logo_path'] = $request->file('logo')->store('tcg-logos', 'public');
        }
        Tcg::create($data);

        return redirect()
            ->route('tcgs.index')
            ->with('success', 'La nouvelle licence a bien été ajoutée');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tcg $tcg)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Tcg $tcg)
    {
        if ($request->user()->cannot('update', $tcg)) {
            abort(403);
        }

        return Inertia::render('tcgs/edit', [
            'tcg' => $tcg,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTcgRequest $request, Tcg $tcg)
    {
        if ($request->user()->cannot('update', $tcg)) {
            abort(403);
        }

        $data = $request->safe()->except(['logo']);
        if ($request->hasFile('logo')) {
            if ($tcg->logo_path) {
                Storage::disk('public')->delete($tcg->logo_path);
            }

            $data['logo_path'] = $request->file('logo')->store('tcg-logos', 'public');
        }
        $tcg->update($data);

        return redirect()
            ->route('tcgs.index')
            ->with('success', 'La licence a bien été modifiée');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Tcg $tcg)
    {
        if ($request->user()->cannot('delete', $tcg)) {
            abort(403);
        }

        $tcg->delete();

        return redirect()
            ->route('tcgs.index')
            ->with('success', 'La licence a bien été supprimée !');
    }
}
