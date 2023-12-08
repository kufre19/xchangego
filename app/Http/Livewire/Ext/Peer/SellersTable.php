<?php

namespace App\Http\Livewire\Ext\Peer;

use App\Models\P2P\P2PSeller;
use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Rappasoft\LaravelLivewireTables\Views\Columns\BooleanColumn;
use Rappasoft\LaravelLivewireTables\Views\Columns\ButtonGroupColumn;
use Rappasoft\LaravelLivewireTables\Views\Columns\LinkColumn;
use Rappasoft\LaravelLivewireTables\Views\Filters\SelectFilter;

class SellersTable extends DataTableComponent
{
    public function builder(): Builder
    {
        return P2PSeller::query()->with('orders', 'user', 'methods', 'offers');
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
            Column::make("user", "user_id")
                ->hideIf(true),
            Column::make("Username", "user.username")
                ->searchable()
                ->collapseOnTablet()
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
            Column::make("Orders", 'id')
                ->sortable()
                ->collapseOnTablet()
                ->format(function ($value, $row) {
                    return $row->orders()->count();
                }),
            Column::make("Offers", 'id')
                ->sortable()
                ->collapseOnTablet()
                ->format(function ($value, $row) {
                    return $row->offers()->count();
                }),
            Column::make("Methods", 'id')
                ->sortable()
                ->collapseOnTablet()
                ->format(function ($value, $row) {
                    return $row->methods()->count();
                }),
            BooleanColumn::make('Status', 'status')
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            ButtonGroupColumn::make('Actions')
                ->attributes(function ($row) {
                    return [
                        'class' => 'space-x-2',
                    ];
                })
                ->buttons([
                    LinkColumn::make('offers')
                        ->title(fn ($row) => 'Offers')
                        ->location(fn ($row) => route('admin.p2p.offers.show', $row->user_id))
                        ->attributes(function ($row) {
                            return [
                                'class' => 'btn btn-outline-primary btn-sm',
                            ];
                        }),
                    LinkColumn::make('Orders')
                        ->title(fn ($row) => 'Orders')
                        ->location(fn ($row) => route('admin.p2p.orders.show', $row->user_id))
                        ->attributes(function ($row) {
                            return [
                                'class' => 'btn btn-outline-warning btn-sm',
                            ];
                        }),
                    LinkColumn::make('Methods')
                        ->title(fn ($row) => 'Methods')
                        ->location(fn ($row) => route('admin.p2p.methods.show', $row->user_id))
                        ->attributes(function ($row) {
                            return [
                                'class' => 'btn btn-outline-info btn-sm',
                            ];
                        }),
                ]),
        ];
    }

    public function filters(): array
    {
        return [
            SelectFilter::make('Active')
                ->setFilterPillTitle('Status')
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
                    $builder->where('p2p_sellers.status', $value);
                }),
        ];
    }
}
