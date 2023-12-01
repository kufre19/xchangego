<?php

namespace App\Http\Controllers\Admin\Extensions\P2P;

use App\Http\Controllers\Controller;

class P2PSellersController extends Controller
{
    public function index()
    {
        $page_title = 'P2P Sellers';
        $id = null;
        return view('extensions.admin.p2p.sellers.index', compact('page_title', 'id'));
    }

    public function show($id)
    {
        $page_title = 'P2P Seller ' . $id;
        return view('extensions.admin.p2p.sellers.index', compact('id', 'page_title'));
    }
}
