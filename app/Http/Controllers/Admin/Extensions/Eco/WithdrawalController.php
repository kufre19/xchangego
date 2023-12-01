<?php

namespace App\Http\Controllers\Admin\Extensions\Eco;

use App\Http\Controllers\Controller;

class WithdrawalController extends Controller
{
    public function index($chain, $symbol)
    {
        $page_title = 'Withdrawals';
        return view('extensions.admin.eco.withdraw.index', compact('page_title', 'symbol', 'chain'));
    }
}
