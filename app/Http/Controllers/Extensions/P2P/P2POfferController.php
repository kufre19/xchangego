<?php

namespace App\Http\Controllers\Extensions\P2P;

use App\Models\P2P\P2POffer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class P2POfferController extends Controller
{
    public function index()
    {
        return response()->json(P2POffer::with('user', 'method')->where('status', 1)->get());
    }

    public function store(Request $request)
    {
        // Add your validation rules here
        $validatedData = $request->validate([
            'price' => 'required|numeric',
            'method' => 'required|string',
            'min' => 'required|numeric',
            'max' => 'required|numeric',
        ]);

        $offer = P2POffer::create($validatedData);

        return response()->json(['message' => 'Offer created successfully.', 'offer' => $offer]);
    }
}
