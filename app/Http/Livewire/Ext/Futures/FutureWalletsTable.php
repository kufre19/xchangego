<?php

namespace App\Http\Livewire\Ext\Futures;

use App\Models\Futures\FutureWallets;
use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;

class FutureWalletsTable extends DataTableComponent
{
    public function builder(): Builder
    {
        return FutureWallets::query()->with(['user']);
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
            Column::make('Symbol', 'symbol')
                ->searchable()
                ->sortable(),
            Column::make('Balance', 'balance')
                ->sortable(),
            Column::make('Available', 'available')
                ->sortable(),
            Column::make('Type', 'type')
                ->searchable()
                ->sortable()
                ->format(function ($value, $row, Column $column) {
                    return strtoupper($value);
                }),
            Column::make('Created At', 'created_at')
                ->sortable(),
        ];
    }
}
