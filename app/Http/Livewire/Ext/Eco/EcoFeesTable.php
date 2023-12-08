<?php

namespace App\Http\Livewire\Ext\Eco;

use App\Http\Controllers\Admin\Extensions\Eco\RpcController;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Eco\EcoFeesAccount;
use Illuminate\Support\Facades\Session;

class EcoFeesTable extends DataTableComponent
{
    public $chain;
    protected $eco;
    protected $net;
    protected $api;
    const SUPPORTED_CHAINS = ["BSC", "ETH", "KLAY", "CELO", "MATIC", "TRON"];
    public function builder(): Builder
    {
        return EcoFeesAccount::query()->with(['wallets'])->where('network', getNativeNetwork())->where('chain', $this->chain);
    }

    public function configure(): void
    {
        $this->setPrimaryKey('id')
            ->setFilterLayoutSlideDown()
            ->setOfflineIndicatorEnabled()
            ->setEmptyMessage('No results found');
    }

    public function columns(): array
    {
        return [
            Column::make("Chain", "chain")
                ->sortable(),
            Column::make("Symbol", "symbol")
                ->sortable()
                ->format(function ($value, $row, Column $column) {
                    return $value . $row->postfix;
                }),
            Column::make("Account ID", "account_id")
                ->sortable(),
            //balance
            Column::make("Balance", "balance")
                ->sortable(),
            Column::make("Actions", "id")
                ->collapseOnTablet()
                ->view('extensions.admin.eco.views.fees.action_btns'),
        ];
    }
    public function bulkActions(): array
    {
        return [
            'refresh_balance' => ['title' => 'Refresh Balance', 'icon' =>  'arrow-repeat'],
            //'unassign' => ['title' => 'Unassign', 'icon' =>  'x-lg'],
        ];
    }

    public function refresh_balance()
    {
        $names = '';
        $count = count($this->getSelected());
        $rpc = new RpcController();
        foreach ($this->getSelected() as $id) {
            $item = EcoFeesAccount::findOrFail($id);
            $names .= $item->symbol . ', ';
            try {
                $item->balance = $rpc->getWalletBalance($item->account_id);
                $item->save();
            } catch (\Throwable $th) {
                //throw $th;
            }
            $item->save();
            Session::flash('alert', [
                'class' => 'success',
                'icon' => 'check-circle', /* danger: exclamation-triangle , success: check-circle, info: exclamation-circle */
                'header' => 'Alert!',
                'message' =>  '(' . rtrim($names, ", ") . ') ' . ($count > 1 ? 'Fees Accounts' : 'Fees Account') . ' Refreshed Successfully'
            ]);
            $this->clearSelected();
        }
    }
}
