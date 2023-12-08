<?php

namespace App\Http\Livewire\Ext\Eco;

use App\Http\Controllers\Admin\Extensions\Eco\RpcController;
use App\Models\Eco\EcoWallet;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Session;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Rappasoft\LaravelLivewireTables\Views\Columns\BooleanColumn;
use Rappasoft\LaravelLivewireTables\Views\Filters\SelectFilter;

class EcoAddressesUtxoTable extends DataTableComponent
{

    public $chain;
    public $symbol;
    protected $eco;
    protected $net;
    protected $api;
    const SUPPORTED_CHAINS = ["BTC", "BCH", "LTC", "DOGE", "DASH"];

    public function builder(): Builder
    {
        return EcoWallet::query()->with(['log', 'user'])->where('chain', $this->chain)->where('symbol', $this->symbol);
    }

    public function configure(): void
    {
        $this->setPrimaryKey('id')
            ->setColumnSelectDisabled()
            ->setFilterLayoutSlideDown()
            ->setOfflineIndicatorEnabled()
            ->setEmptyMessage('No results found');
    }

    public function columns(): array
    {
        return [
            Column::make("Id", "id")
                ->hideIf(true)
                ->sortable(),
            Column::make("Index", "index")
                ->collapseOnTablet()
                ->sortable(),
            Column::make("user", "user_id")
                ->hideIf(true),
            Column::make("Holder", "user.username")
                ->searchable()
                ->sortable()
                ->format(
                    function ($value, $row, Column $column) {
                        if ($row->user) {
                            return '<a href="' . route('admin.users.detail', $row->user_id) . '" class="badge bg-primary">' . ucfirst($row->user->username) . '</a>';
                        } else {
                            return '<span class="badge bg-danger">' . __('Account Not Found') . '</span>';
                        }
                    }
                )
                ->html(),
            Column::make("Balance", "balance")
                ->collapseOnTablet()
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => '<span class="' . ($row->balance != 0 ? 'fw-bolder' : '') . '">' . getAmount($row->balance) . '</span>'
                )
                ->html(),
            Column::make("Free balance", "free_balance")
                ->collapseOnTablet()
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => '<span class="' . ($row->free_balance != 0 ? 'fw-bolder' : '') . '">' . getAmount($row->free_balance) . '</span>'
                )
                ->html(),
            Column::make("Address", "address")
                ->collapseOnTablet()
                ->view('extensions.admin.eco.views.addresses_links'),
            BooleanColumn::make('Assigned')
                ->hideIf(true),
            BooleanColumn::make('Status')
                ->hideIf(true),
            BooleanColumn::make('Chain')
                ->hideIf(true),
            Column::make("Total Deposits", "id")
                ->sortable()
                ->format(function ($value, $row, Column $column) {
                    return $row->log->where('type', '1')->sum('amount');
                }),
            Column::make("Total Withdraws", "id")
                ->sortable()
                ->format(function ($value, $row, Column $column) {
                    return $row->log->where('type', '2')->sum('amount');
                }),
            Column::make("Collected Fees", "id")
                ->sortable()
                ->format(function ($value, $row, Column $column) {
                    return $row->log->sum('fee');
                }),
        ];
    }

    public function filters(): array
    {
        return [
            SelectFilter::make('Active')
                ->setFilterPillTitle('User Status')
                ->setFilterPillValues([
                    '1' => 'Active',
                    '0' => 'Inactive',
                ])
                ->options([
                    '' => 'All',
                    '1' => 'Yes',
                    '0' => 'No',
                ])
                ->filter(function (Builder $builder, string $value) {
                    if ($value === '1') {
                        $builder->where('status', true);
                    } elseif ($value === '0') {
                        $builder->where('status', false);
                    }
                }),
        ];
    }

    public function bulkActions(): array
    {
        return [
            'refresh_free_balance' => ['title' => 'Refresh Balance', 'icon' =>  'arrow-repeat'],
            //'unassign' => ['title' => 'Unassign', 'icon' =>  'x-lg'],
        ];
    }

    public function refresh_free_balance()
    {
        $names = '';
        $count = count($this->getSelected());
        $rpc = new RpcController();
        foreach ($this->getSelected() as $id) {
            $item = EcoWallet::findOrFail($id);
            $names .= $item->index . ', ';
            $free_balance = $rpc->getClientWalletBalance($item->id);
            if ($free_balance != null) {
                $item->free_balance = $free_balance;
            } else {
                Session::flash('alert', [
                    'class' => 'success',
                    'icon' => 'check-circle', /* danger: exclamation-triangle , success: check-circle, info: exclamation-circle */
                    'header' => 'Alert!',
                    'message' =>  '(' . rtrim($names, ", ") . ') ' . ($count > 1 ? 'Addresses' : 'Address') . ' balance checking failed.'
                ]);
            }
            if ($item->account_id != null) {
                try {
                    $item->balance = $rpc->getWalletBalance($item->account_id);
                    $item->save();
                } catch (\Throwable $th) {
                    //throw $th;
                }
            }
            $item->save();
            Session::flash('alert', [
                'class' => 'success',
                'icon' => 'check-circle', /* danger: exclamation-triangle , success: check-circle, info: exclamation-circle */
                'header' => 'Alert!',
                'message' =>  '(' . rtrim($names, ", ") . ') ' . ($count > 1 ? 'Wallets' : 'Wallet') . ' Refreshed Successfully'
            ]);
            $this->clearSelected();
        }
    }
}
