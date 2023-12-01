<?php

namespace App\Http\Controllers\Admin\Extensions\P2P;

use App\Http\Controllers\Controller;

class P2PMethodsController extends Controller
{
    public function index()
    {
        $page_title = 'P2P Methods';
        $id = null;
        return view('extensions.admin.p2p.methods.index', compact('page_title', 'id'));
    }

    public function show($id)
    {
        $page_title = 'P2P Method ' . $id;
        return view('extensions.admin.p2p.methods.index', compact('id', 'page_title'));
    }
}
