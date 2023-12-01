<?php

namespace App\Http\Livewire\Ext\Peer;

use App\Models\P2P\P2POrder;
use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Rappasoft\LaravelLivewireTables\Views\Columns\ButtonGroupColumn;
use Rappasoft\LaravelLivewireTables\Views\Columns\LinkColumn;

class OrdersTable extends DataTableComponent
{
    public $userid;

    public function builder(): Builder
    {
        if ($this->userid != null) {
            return P2POrder::query()->where('seller_id', $this->userid);
        } else {
            return P2POrder::query();
        }
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
                ->sortable(),
            Column::make("Buyer", "buyer_id")
                ->searchable()
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => '<a href="' . route('admin.users.detail', $row->buyer_id) . '" class="badge bg-primary bg-' . ($row->buyer->username ?? 'danger') . '">' . ucfirst($row->buyer->username ?? 'Account Not Found') . '</a>'
                )
                ->html(),
            Column::make("Seller", "seller_id")
                ->searchable()
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => '<a href="' . route('admin.users.detail', $row->seller_id) . '" class="badge bg-primary bg-' . ($row->seller->user->username ?? 'danger') . '">' . ucfirst($row->seller->user->username ?? 'Account Not Found') . '</a>'
                )
                ->html(),
            Column::make("Amount", "amount")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Trx", "trx")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            Column::make('Status')
                ->collapseOnMobile()
                ->sortable()
                ->view('extensions.admin.p2p.orders.status'),
            ButtonGroupColumn::make('Actions')
                ->attributes(function ($row) {
                    return [
                        'class' => 'space-x-2',
                    ];
                })
                ->buttons([
                    LinkColumn::make('View')
                        ->title(fn ($row) => 'View')
                        ->location(fn ($row) => route('admin.p2p.orders.view', $row->id))
                        ->attributes(function ($row) {
                            return [
                                'class' => 'btn btn-outline-success btn-sm',
                            ];
                        }),
                ]),
        ];
    }
}
