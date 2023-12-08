<?php

namespace App\Http\Livewire\Ext\Futures;

use App\Models\Futures\FuturePosition;
use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Rappasoft\LaravelLivewireTables\Views\Filters\SelectFilter;
use Rappasoft\LaravelLivewireTables\Views\Filters\DateFilter;

class FuturePositionsTable extends DataTableComponent
{
    public function builder(): Builder
    {
        return FuturePosition::query()->with(['user']);
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
            Column::make('Position ID', 'position_id')
                ->searchable()
                ->sortable(),
            Column::make('Symbol', 'symbol')
                ->searchable()
                ->sortable(),
            Column::make('Side', 'side')
                ->searchable()
                ->sortable()
                ->format(function ($value, $row, Column $column) {
                    $badgeColor = $value === 'long' ? 'success' : 'danger';
                    $title = $value === 'long' ? 'Buy/Long' : 'Sell/Short';
                    return '<span class="badge bg-' . $badgeColor . '">' . $title . '</span>';
                })
                ->html(),
            Column::make('Initial Margin', 'initialMargin')
                ->sortable(),
            Column::make('Entry Price', 'entryPrice')
                ->sortable(),
            Column::make('Leverage', 'leverage')
                ->sortable(),
            Column::make('Contracts', 'contracts')
                ->sortable(),
            Column::make('Contract Size', 'contractSize')
                ->sortable(),
            Column::make('Liquidation Price', 'liquidationPrice')
                ->sortable(),
            Column::make('Created At', 'created_at')
                ->sortable(),
        ];
    }

    public function filters(): array
    {
        return [
            SelectFilter::make('Side')
                ->setFilterPillTitle('Side')
                ->setFilterPillValues([
                    'long' => 'Buy/Long',
                    'short' => 'Sell/Short',
                ])
                ->options([
                    '' => 'All',
                    'long' => 'Buy/Long',
                    'short' => 'Sell/Short',
                ])
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('future_positions.side', $value);
                }),
            DateFilter::make('From')
                ->config([
                    'min' => '2020-01-01',
                    'max' => date('Y-m-d'),
                ])
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('future_positions.created_at', '>=', $value);
                }),
            DateFilter::make('To')
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('future_positions.created_at', '<=', $value);
                }),
        ];
    }
}
