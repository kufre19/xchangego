<?php

namespace App\Http\Livewire\Ext\Eco;

use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Rappasoft\LaravelLivewireTables\Views\Filters\DateFilter;
use Rappasoft\LaravelLivewireTables\Views\Filters\SelectFilter;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Eco\EcoLog;

class EcoLogsTable extends DataTableComponent
{
    public function builder(): Builder
    {
        return EcoLog::query()->with(['wallet_admin']);
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
            Column::make("Id", "id")
                ->sortable(),
            Column::make("Wallet", "wallet_id")
                ->hideIf(true),
            Column::make("User", "wallet_admin.user.username")
                ->searchable()
                ->collapseOnTablet()
                ->sortable()
                ->format(
                    function ($value, $row, Column $column) {
                        if ($row->type == 3) {
                            return '<span class="badge bg-danger">Fees Withdraw</span>';
                        } elseif ($row->wallet_admin && $row->wallet_admin->user) {
                            return '<a href="' . route('admin.users.detail', $row->wallet_admin->user_id) . '" class="badge bg-primary">' . ucfirst($row->wallet_admin->user->username) . '</a>';
                        } else {
                            return '<span class="badge bg-danger">' . __('Wallet not found') . '</span>';
                        }
                    }
                )
                ->html(),
            Column::make("Currency", "wallet_admin.currency")
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Chain", "wallet_admin.chain")
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Amount", "amount")
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Fee", "fee")
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Ref ID", "ref_id")
                ->collapseOnTablet()
                ->sortable(),
            Column::make("TxID", "txid")
                ->collapseOnTablet()
                ->view('extensions.admin.eco.views.txid'),
            Column::make("Type", "type")
                ->searchable()
                ->collapseOnTablet()
                ->sortable()
                ->format(function ($value, $row, Column $column) {
                    switch ($value) {
                        case 1:
                            return '<span class="badge bg-primary">Deposit</span>';
                        case 2:
                            return '<span class="badge bg-warning">Withdraw</span>';
                        case 3:
                            return '<span class="badge bg-danger">Fees Withdraw</span>';
                        default:
                            return '<span class="badge bg-dark">Unknown</span>';
                    }
                })
                ->html(),
            Column::make("Status", "status")
                ->searchable()
                ->collapseOnTablet()
                ->sortable()
                ->format(function ($value, $row, Column $column) {
                    switch ($value) {
                        case 0:
                            return '<span class="badge bg-warning">Pending</span>';
                        case 1:
                            return '<span class="badge bg-success">Completed</span>';
                        default:
                            return '<span class="badge bg-danger">Unknown</span>';
                    }
                })
                ->html(),
            Column::make("Created at", "created_at")
                ->searchable()
                ->collapseOnTablet()
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => showDateTime($row->created_at, 'd M, Y h:i:s')
                )
                ->html(),
        ];
    }

    public function filters(): array
    {
        return [
            SelectFilter::make('Status')
                ->setFilterPillTitle('Status')
                ->options([
                    '' => 'All',
                    '1' => 'Completed',
                    '0' => 'Pending',
                ])
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('eco_logs.status', $value);
                }),
            SelectFilter::make('Type')
                ->setFilterPillTitle('Type')
                ->options([
                    '' => 'All',
                    '3' => 'Fees Withdraw',
                    '2' => 'Withdraw',
                    '1' => 'Deposit',
                ])
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('eco_logs.status', $value);
                }),
            DateFilter::make('From Date')
                ->config([
                    'min' => '2020-01-01',
                    'max' => date('y-m-d'),
                ])
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('eco_logs.created_at', '>=', $value);
                }),
            DateFilter::make('To Date')
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('eco_logs.created_at', '<=', $value);
                }),
        ];
    }
}
