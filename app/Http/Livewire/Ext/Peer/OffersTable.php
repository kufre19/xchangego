<?php

namespace App\Http\Livewire\Ext\Peer;

use App\Models\P2P\P2POffer;
use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Rappasoft\LaravelLivewireTables\Views\Columns\BooleanColumn;
use Rappasoft\LaravelLivewireTables\Views\Columns\ButtonGroupColumn;
use Rappasoft\LaravelLivewireTables\Views\Columns\LinkColumn;

class OffersTable extends DataTableComponent
{

    public $userid;

    public function builder(): Builder
    {
        if ($this->userid != null) {
            return P2POffer::query()->where('user_id', $this->userid);
        } else {
            return P2POffer::query();
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
            Column::make("User", "user_id")
                ->hideIf($this->userid != null)
                ->searchable()
                ->collapseOnTablet()
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => '<a href="' . route('admin.users.detail', $row->user_id) . '" class="badge bg-primary">' . (isset($row->user) ? ucfirst($row->user->username) : 'User not found') . '</a>'
                )
                ->html(),
            Column::make("Currency", "currency")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Price", "price")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Min", "min")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Max", "max")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Available", "available")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Payment Method", "payment_method_id")
                ->searchable()
                ->collapseOnTablet()
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => $row->method->name ?? 'N/A'
                ),
            BooleanColumn::make("Status", "status")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(), ButtonGroupColumn::make('Actions')
                ->attributes(function ($row) {
                    return [
                        'class' => 'space-x-2',
                    ];
                })
                ->buttons([
                    LinkColumn::make('Orders')
                        ->title(fn ($row) => 'Orders')
                        ->location(fn ($row) => route('admin.p2p.orders.offer', $row->id))
                        ->attributes(function ($row) {
                            return [
                                'class' => 'btn btn-outline-warning btn-sm',
                            ];
                        }),
                ]),
        ];
    }
}
