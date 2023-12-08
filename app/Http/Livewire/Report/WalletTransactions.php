<?php

namespace App\Http\Livewire\Report;

use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Rappasoft\LaravelLivewireTables\Views\Filters\DateFilter;
use Rappasoft\LaravelLivewireTables\Views\Filters\SelectFilter;
use Illuminate\Database\Eloquent\Builder;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Session;
use App\Models\WalletsTransactions;
use Maatwebsite\Excel\Facades\Excel;

class WalletTransactions extends DataTableComponent
{
    public function builder(): Builder
    {
        return WalletsTransactions::query()->with(['user']);
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
                ->hideIf(true),
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
            Column::make("Symbol", "symbol")
                ->hideIf(true),
            Column::make("Amount", "amount")
                ->hideIf(true),
            Column::make("Amount recieved", "amount_recieved")
                ->hideIf(true),
            Column::make("Charge", "charge")
                ->hideIf(true),
            Column::make("Fees", "fees")
                ->hideIf(true),
            Column::make("To", "to")
                ->hideIf(true),
            Column::make("To", "created_at")
                ->hideIf(true),
            Column::make("Type", "type")
                ->searchable()
                ->collapseOnTablet()
                ->sortable()
                ->view('admin.reports.views.wallet.type'),
            Column::make("Chain", "chain")
                ->hideIf(true),
            Column::make("Status", "status")
                ->searchable()
                ->collapseOnTablet()
                ->sortable()
                ->view('admin.reports.views.wallet.status'),
            Column::make("Trx", "trx")
                ->hideIf(true),
            Column::make("Wallet type", "wallet_type")
                ->hideIf(true),
            Column::make("Address", "address")
                ->hideIf(true),
            Column::make("Details", "details")
                ->sortable()
                ->collapseOnTablet()
                ->view('admin.reports.views.wallet.info'),
            Column::make("Actions", "id")
                ->view('admin.reports.views.wallet.actions'),
        ];
    }

    public function filters(): array
    {
        return [
            SelectFilter::make('Status')
                ->setFilterPillTitle('Status')
                ->setFilterPillValues([
                    '3' => 'Rejected',
                    '2' => 'Pending',
                    '1' => 'Completed',
                ])
                ->options([
                    '' => 'All',
                    '3' => 'Rejected',
                    '2' => 'Pending',
                    '1' => 'Completed',
                ])
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('wallets_transactions.status', $value);
                }),
            SelectFilter::make('Type')
                ->setFilterPillTitle('Type')
                ->setFilterPillValues([
                    'FT' => 'Funding To Trading Transfer',
                    'FFU' => 'Funding To Futures Transfer',
                    'FUT' => 'Futures To Trading Transfer',
                    'FUF' => 'Futures To Funding Transfer',
                    'TF' => 'Trading To Funding Transfer',
                    'TFU' => 'Trading To Futures Transfer',
                    '6' => 'Primary To Funding Transfer',
                    '5' => 'Primary To Trading Transfer',
                    '4' => 'Funding To Trading Transfer',
                    '3' => 'Trading To Funding Transfer',
                    '2' => 'Withdraw',
                    '1' => 'Deposit',
                ])
                ->options([
                    '' => 'All',
                    'FT' => 'Funding To Trading Transfer',
                    'FFU' => 'Funding To Futures Transfer',
                    'FUT' => 'Futures To Trading Transfer',
                    'FUF' => 'Futures To Funding Transfer',
                    'TF' => 'Trading To Funding Transfer',
                    'TFU' => 'Trading To Futures Transfer',
                    '6' => 'Primary To Funding Transfer',
                    '5' => 'Primary To Trading Transfer',
                    '2' => 'Withdraw',
                    '1' => 'Deposit',
                ])
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('wallets_transactions.type', $value);
                }),
            SelectFilter::make('Wallet Type')
                ->setFilterPillTitle('Wallet Type')
                ->setFilterPillValues([
                    'trading' => 'Trading',
                    'funding' => 'Funding',
                ])
                ->options([
                    '' => 'All',
                    'trading' => 'Trading',
                    'funding' => 'Funding',
                ])
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('wallets_transactions.wallet_type', $value);
                }),
            DateFilter::make('From Date')
                ->config([
                    'min' => '2020-01-01',
                    'max' => date('y-m-d'),
                ])
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('wallets_transactions.created_at', '>=', $value);
                }),
            DateFilter::make('To Date')
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('wallets_transactions.created_at', '<=', $value);
                }),
        ];
    }

    public function bulkActions(): array
    {
        return [
            'export' => ['title' => 'Export', 'icon' =>  'download'],
            'delete' => ['title' => 'Delete', 'icon' =>  'x-lg'],
        ];
    }


    public function export()
    {
        $names = '';
        $count = count($this->getSelected());
        $items = $this->getSelected();
        foreach ($this->getSelected() as $id) {
            $names .= WalletsTransactions::findOrFail($id)->username . ', ';
        }
        Session::flash('alert', [
            'class' => 'success',
            'icon' => 'check-circle', /* danger: exclamation-triangle , success: check-circle, info: exclamation-circle */
            'header' => 'Alert!',
            'message' =>  '(' . rtrim($names, ", ") . ') ' . ($count > 1 ? 'Transactions' : 'Transaction') . ' Exported Successfully'
        ]);

        $this->clearSelected();
        return Excel::download(new WalletsTransactionsExport($items), 'users.xlsx');
    }

    public function delete()
    {
        abort_if(Gate::denies('user_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $names = '';
        $count = count($this->getSelected());
        foreach ($this->getSelected() as $id) {
            $item = WalletsTransactions::findOrFail($id);
            $names .= $item->username . ', ';
            $item->delete();
        }
        Session::flash('alert', [
            'class' => 'danger',
            'icon' => 'exclamation-triangle',
            'header' => 'Alert!',
            'message' =>  '(' . rtrim($names, ", ") . ') ' . ($count > 1 ? 'Transactions' : 'Transaction') . ' Removed Successfully'
        ]);
        $this->clearSelected();
    }
}
