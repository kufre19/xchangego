<?php

namespace App\Http\Livewire\Ext\Peer\Orders;

use App\Models\P2P\P2POrder;
use Livewire\Component;

class OrderStatus extends Component
{
    public $order;

    protected $listeners = ['refreshData' => 'refresh'];

    public function refresh()
    {
        $this->order->refresh();
    }

    public function mount(P2POrder $order)
    {
        $this->order = $order;
    }

    public function render()
    {
        return view('livewire.ext.peer.orders.order-status');
    }
}
