<?php

namespace App\Http\Controllers\Admin\Extensions\P2P;

use App\Http\Controllers\Controller;

class P2POffersController extends Controller
{
    public function index()
    {
        $page_title = 'P2P Offers';
        $id = null;
        return view('extensions.admin.p2p.offers.index', compact('page_title', 'id'));
    }

    public function show($id)
    {
        $page_title = 'P2P Offer ' . $id;
        return view('extensions.admin.p2p.offers.index', compact('id', 'page_title'));
    }
}
