<?php

namespace App\Http\Livewire\Ext\Futures;

use App\Models\Futures\FutureOrder;
use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Rappasoft\LaravelLivewireTables\Views\Filters\SelectFilter;
use Rappasoft\LaravelLivewireTables\Views\Filters\DateFilter;

class FutureOrdersTable extends DataTableComponent
{
    public function builder(): Builder
    {
        return FutureOrder::query()->with(['user']);
    }

    public function configure(): void
    {
        $this->setPrimaryKey('id')
            ->setDefaultSort('id', 'desc')
            ->setColumnSelectDisabled()
            ->setFilterLayoutSlideDown()
            ->setOfflineIndicatorEnabled()
            ->setEmptyMessage('No results found');
    }

    public function columns(): array
    {
        return [
            Column::make('Id', 'id')
                ->sortable(),
            Column::make('User', 'user_id')
                ->hideIf(true),
            Column::make('Username', 'user.username')
                ->searchable()
                ->sortable()
                ->format(function ($value, $row, Column $column) {
                    if ($row->user) {
                        return '<a href="' . route('admin.users.detail', $row->user_id) . '" class="badge bg-primary">' . ucfirst($row->user->username) . '</a>';
                    } else {
                        return '<span class="badge bg-danger">' . __('Account Not Found') . '</span>';
                    }
                })
                ->html(),
            Column::make('Order ID', 'order_id')
                ->searchable()
                ->sortable(),
            Column::make('Symbol', 'symbol')
                ->searchable()
                ->sortable(),
            Column::make('Type', 'type')
                ->searchable()
                ->sortable(),
            Column::make('Side', 'side')
                ->searchable()
                ->sortable()
                ->format(function ($value, $row, Column $column) {
                    $badgeColor = $value === 'buy' ? 'success' : 'danger';
                    $title = $value === 'buy' ? 'Buy/Long' : 'Sell/Short';
                    return '<span class="badge bg-' . $badgeColor . '">' . $title . '</span>';
                })
                ->html(),
            Column::make('Price', 'price')
                ->sortable(),
            Column::make('Stop Price', 'stopPrice')
                ->sortable(),
            Column::make('Amount', 'amount')
                ->sortable(),
            Column::make('Cost', 'cost')
                ->sortable(),
            Column::make('Average', 'average')
                ->sortable(),
            Column::make('Filled', 'filled')
                ->sortable()
                ->format(function ($value, $row, Column $column) {
                    return (int) $value;
                }),
            Column::make('Remaining', 'remaining')
                ->sortable()
                ->format(function ($value, $row, Column $column) {
                    return (int) $value;
                }),
            Column::make('Status', 'status')
                ->searchable()
                ->sortable()
                ->format(function ($value, $row, Column $column) {
                    $badgeColor = $value === 'closed' ? 'success' : 'warning';
                    return '<span class="badge bg-' . $badgeColor . '">' . ucfirst($value) . '</span>';
                })
                ->html(),
            Column::make('Leverage', 'leverage')
                ->sortable(),
            Column::make('Fee', 'fee')
                ->sortable(),
            Column::make('Created At', 'created_at')
                ->sortable(),
        ];
    }

    public function filters(): array
    {
        return [
            SelectFilter::make('Status')
                ->setFilterPillTitle('Status')
                ->setFilterPillValues([
                    'open' => 'Open',
                    'closed' => 'Closed',
                ])
                ->options([
                    '' => 'All',
                    'open' => 'Open',
                    'closed' => 'Closed',
                ])
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('future_orders.status', $value);
                }),
            SelectFilter::make('Side')
                ->setFilterPillTitle('Side')
                ->setFilterPillValues([
                    'buy' => 'Buy/Long',
                    'sell' => 'Sell/Short',
                ])
                ->options([
                    '' => 'All',
                    'buy' => 'Buy/Long',
                    'sell' => 'Sell/Short',
                ])
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('future_orders.side', $value);
                }),
            SelectFilter::make('Type')
                ->setFilterPillTitle('Type')
                ->setFilterPillValues([
                    'Limit' => 'Limit',
                    'Market' => 'Market',
                ])
                ->options([
                    '' => 'All',
                    'Limit' => 'Limit',
                    'Market' => 'Market',
                ])
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('future_orders.type', $value);
                }),
            DateFilter::make('From')
                ->config([
                    'min' => '2020-01-01',
                    'max' => date('Y-m-d'),
                ])
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('future_orders.created_at', '>=', $value);
                }),
            DateFilter::make('To')
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('future_orders.created_at', '<=', $value);
                }),
        ];
    }
}
