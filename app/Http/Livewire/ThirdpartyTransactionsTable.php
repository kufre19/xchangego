<?php

namespace App\Http\Livewire;

use App\Models\ThirdpartyTransactions;
use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Rappasoft\LaravelLivewireTables\Views\Filters\DateFilter;
use Rappasoft\LaravelLivewireTables\Views\Filters\SelectFilter;

class ThirdpartyTransactionsTable extends DataTableComponent
{

    public string $type = '';
    public $gen;
    public function mount(string $type): void
    {
        $this->type = $type;
        $this->gen = getGen();
    }

    public function builder(): Builder
    {
        return ThirdpartyTransactions::query()->where('type', $this->type);
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
            Column::make("Date", "created_at")
                ->searchable()
                ->collapseOnTablet()
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => showDateTime($row->created_at, 'd M, Y h:i:s')
                )
                ->html(),
            Column::make("Symbol", "symbol")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Chain", "chain")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Trx", "address")
                ->searchable()
                ->collapseOnTablet()
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => strtoupper($row->address)
                )
                ->html(),
            Column::make("user", "user_id")
                ->hideIf(true),
            Column::make("Username", "user.username")
                ->hideIf(request()->routeIs('admin.users.deposits') && request()->routeIs('admin.users.deposits.method'))
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
            Column::make("Info", "amount")
                ->view('admin.deposit.thirdparty_amount'),
            Column::make("Fee", "fee")
                ->hideIf(true),
            Column::make("Status", "status")
                ->view('admin.deposit.thirdparty_status'),
            Column::make("Actions", "id")
                ->view('admin.deposit.thirdparty_actions'),
        ];
    }

    public function filters(): array
    {
        return [
            SelectFilter::make('Status')
                ->setFilterPillTitle('Status')
                ->setFilterPillValues([
                    '2' => 'Failed',
                    '1' => 'Successful',
                    '0' => 'Pending',
                ])
                ->options([
                    '' => 'All',
                    '2' => 'Failed',
                    '1' => 'Successful',
                    '0' => 'Pending',
                ])
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('thirdparty_transactions.status', $value);
                }),
            DateFilter::make('From')
                ->config([
                    'min' => '2020-01-01',
                    'max' => date('y-m-d'),
                ])
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('thirdparty_transactions.created_at', '>=', $value);
                }),
            DateFilter::make('To')
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('thirdparty_transactions.created_at', '<=', $value);
                }),
        ];
    }
}
