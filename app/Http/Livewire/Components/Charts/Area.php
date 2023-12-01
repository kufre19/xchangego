<?php

namespace App\Http\Livewire\Components\Charts;

use App\Models\User;
use App\Models\P2P\P2POrder;
use App\Models\P2P\P2PSeller;
use Livewire\Component;

class Area extends Component
{
    public $icon;
    public $route;
    public $element;
    public $title;
    public $tooltip;
    public $color;

    public $readyToLoad = false;

    public function loadData()
    {
        $this->readyToLoad = true;
    }

    public function render()
    {
        switch ($this->element) {
            case 'total_users':
                $data = auth()->user()->allusers(30);
                break;
            case 'verified_users':
                $data = auth()->user()->verified(30);
                break;
            case 'unverified_users':
                $data = auth()->user()->unverified(30);
                break;
            case 'p2p_orders':
                $data['chart'] = P2POrder::chart('days', 30, 'all');
                $data = arrayToObject($data);
                break;
            case 'completed_p2p_orders':
                $data['chart'] = P2POrder::chart('days', 30, 'completed');
                $data = arrayToObject($data);
                break;
            case 'open_p2p_orders':
                $data['chart'] = P2POrder::chart('days', 30, 'open');
                $data = arrayToObject($data);
                break;
            case 'cancelled_p2p_orders':
                $data['chart'] = P2POrder::chart('days', 30, 'cancelled');
                $data = arrayToObject($data);
                break;
            case 'sellers_count':
                $data['chart'] = P2PSeller::chart('days', 30, 'count');
                $data = arrayToObject($data);
                break;
            case 'sellers_total_volume':
                $data['chart'] = P2PSeller::chart('days', 30, 'total_volume');
                $data = arrayToObject($data);
                break;
            case 'sellers_total_commissions':
                $data['chart'] = P2PSeller::chart('days', 30, 'total_commissions');
                $data = arrayToObject($data);
                break;
            case 'sellers_total_fees':
                $data['chart'] = P2PSeller::chart('days', 30, 'total_fees');
                $data = arrayToObject($data);
                break;
            default:
                break;
        }

        return view('livewire.components.charts.area', [
            'data' => $data,
            'icon' => $this->icon,
            'element' => $this->element,
            'title' => $this->title,
            'tooltip' => $this->tooltip,
            'color' => $this->color,
        ]);
    }
}
