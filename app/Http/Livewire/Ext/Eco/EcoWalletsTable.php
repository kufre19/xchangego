<?php

namespace App\Http\Livewire\Ext\Eco;

use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Eco\EcoWallet;
use App\Models\Eco\EcoLog;

class EcoWalletsTable extends DataTableComponent
{
    public $chain;
    public function builder(): Builder
    {
        return EcoWallet::query()->with(['log', 'user'])
            ->where('chain', $this->chain);
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
            Column::make("user_id", "user_id")
                ->hideIf(true),
            Column::make("User", "user.username")
                ->searchable()
                ->sortable()
                ->format(function ($value, $row, Column $column) {
                    if ($row->user) {
                        return '<a href="' . route('admin.users.detail', $row->user_id) . '" class="badge bg-primary">' . ucfirst($row->user->username) . '</a>';
                    } else {
                        return '<span class="badge bg-danger">' . __('User not found') . '</span>';
                    }
                })
                ->html(),
            Column::make("Currency", "currency")
                ->sortable(),
            Column::make("Chain", "chain")
                ->sortable(),
            Column::make("Balance", "balance")
                ->sortable(),
            Column::make("Free Balance", "free_balance")
                ->sortable(),
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
}
