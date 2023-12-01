<?php

namespace App\Http\Controllers\Admin\Extensions\P2P;

use App\Http\Controllers\Controller;
use App\Models\P2P\P2POffer;
use App\Models\P2P\P2POrder;
use App\Models\P2P\P2PSeller;

class P2PController extends Controller
{
    public function index()
    {
        $page_title = 'P2P Dashboard';

        $sellersCount = P2PSeller::count();
        $sellersTotalVolume = $this->getSellersTotalVolume();
        $sellersTotalCommissions = $this->getSellersTotalCommissions($sellersTotalVolume);
        $offersCount = P2POffer::count();
        $ordersCount = P2POrder::count();
        $totalEarnedFees = $this->getTotalEarnedFees();

        $completedOrders = P2POrder::where('status', 'completed')->count();
        $ordersCompletionRate = $ordersCount == 0 ? 0 : round(($completedOrders / $ordersCount) * 100, 2);

        return view('extensions.admin.p2p.index', compact(
            'page_title',
            'sellersCount',
            'sellersTotalVolume',
            'sellersTotalCommissions',
            'offersCount',
            'ordersCount',
            'totalEarnedFees',
            'ordersCompletionRate'
        ));
    }

    private function getSellersTotalVolume()
    {
        return P2POrder::where('status', 'completed')
            ->whereHas('seller')
            ->sum('amount');
    }

    private function getSellersTotalCommissions($totalVolume)
    {
        return $totalVolume - P2POrder::where('status', 'completed')
            ->whereHas('seller')
            ->sum('fee');
    }

    private function getTotalEarnedFees()
    {
        return P2POrder::where('status', 'completed')
            ->sum('fee');
    }
}
