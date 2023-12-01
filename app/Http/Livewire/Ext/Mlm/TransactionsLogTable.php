<?php

namespace App\Http\Livewire\Ext\Mlm;

use App\Exports\MLMTransactionsExport;
use App\Models\MLM\MLMTransactions;
use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Rappasoft\LaravelLivewireTables\Views\Filters\DateFilter;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Session;

class TransactionsLogTable extends DataTableComponent
{

    public function builder(): Builder
    {
        return MLMTransactions::query()->with(['user']);
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
            Column::make("Id", "id")
                ->sortable(),
            Column::make("user", "user_id")
                ->hideIf(true),
            Column::make("Username", "user.username")
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
            Column::make("Hash", "hash")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            Column::make("wallet_address", "wallet_address")
                ->hideIf(true),
            Column::make("amount", "amount")
                ->hideIf(true),
            Column::make("Status", "status")
                ->view('extensions.admin.mlm.transactions_status_view'),
            Column::make("Date", "created_at")
                ->searchable()
                ->collapseOnTablet()
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => showDateTime($row->created_at, 'd M, Y h:i:s')
                )
                ->html(),
            Column::make("Actions", "id")
                ->view('extensions.admin.mlm.transactions_actions_view'),
        ];
    }

    public function filters(): array
    {
        return [
            DateFilter::make('From')
                ->config([
                    'min' => '2022-01-01',
                    'max' => date('y-m-d'),
                ])
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('mlm_transactions.created_at', '>=', $value);
                }),
            DateFilter::make('To')
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('mlm_transactions.created_at', '<=', $value);
                }),
        ];
    }
    public function bulkActions(): array
    {
        return [
            'export' => ['title' => 'Export', 'icon' =>  'download'],
            'clean' => ['title' => 'Clean', 'icon' =>  'x-lg'],
        ];
    }

    public function export()
    {
        $logs = $this->getSelected();
        Session::flash('alert', [
            'class' => 'success',
            'icon' => 'check-circle', /* danger: exclamation-triangle , success: check-circle, info: exclamation-circle */
            'header' => 'Alert!',
            'message' =>  'Logs Exported Successfully'
        ]);

        $this->clearSelected();
        return Excel::download(new MLMTransactionsExport($logs), 'mlm_transactions_log.xlsx');
    }

    public function clean()
    {
        $names = '';
        $count = count($this->getSelected());
        foreach ($this->getSelected() as $id) {
            $item = MLMTransactions::findOrFail($id);
            $names .= $item->id . ', ';
            if (!isset($item->user->username)) {
                $item->delete();
            }
        }
        Session::flash('alert', [
            'class' => 'danger',
            'icon' => 'exclamation-triangle',
            'header' => 'Alert!',
            'message' =>  '(' . rtrim($names, ", ") . ') ' . ($count > 1 ? 'Records' : 'Record') . ' Removed Successfully'
        ]);
        $this->clearSelected();
    }
}
