<?php

namespace App\Http\Controllers\Admin\Extensions\Ecommerce;

use App\Http\Controllers\Controller;
use App\Models\Ecommerce\EcommerceOrders;

class OrdersController  extends Controller
{
    public function index()
    {
        $page_title = 'Ecommerce Orders';

        return view('extensions.admin.ecommerce.orders.index', compact('page_title'));
    }
}
