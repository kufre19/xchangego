<?php

namespace App\Http\Controllers\Admin\Extensions\Ecommerce;

use App\Http\Controllers\Controller;
use App\Models\Ecommerce\Categories;
use Illuminate\Http\Request;

class EcommerceController extends Controller
{

    public function index()
    {
        $page_title = 'Ecommerce Dashboard';
        return view('extensions.admin.ecommerce.index', compact('page_title'));
    }
}
