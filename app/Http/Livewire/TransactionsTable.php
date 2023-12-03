<?php

namespace App\Http\Livewire;

use Livewire\Component;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Rappasoft\LaravelLivewireTables\Views\Filters\SelectFilter;
use Rappasoft\LaravelLivewireTables\Views\Columns\BooleanColumn;

class TransactionsTable extends DataTableComponent
{
    public string $tableName = 'Transactions';
    public string $user;

    public function mount($user): void
    {
        $this->user = $user;
    }

    public function builder(): Builder
    {
        return Transaction::query()->where('user_id', $this->user);
    }

    public function configure(): void
    {
        $this->setPrimaryKey('id')
         
            ->setFilterLayoutSlideDown()
            ->setOfflineIndicatorEnabled()
            ->setEmptyMessage('No wallet found');
    }

    public function columns(): array
    {
        return [
            Column::make("Id", "id")
                ->sortable(),
            Column::make("User", "user_id")
                ->hideIf(true),
            Column::make("Currency", "currency")
                ->searchable()
                ->sortable(),
            Column::make("Amount", "amount")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Trx", "trx")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
                Column::make("Status", "status")
                ->searchable()
                ->sortable()
                ->format(function ($value, $row, Column $column) {
                    switch ($value) {
                        case 1:
                            return 'Success';
                        case 2:
                            return 'Pending';
                        case 3:
                            return 'Cancel';
                        default:
                            return 'Unknown';
                    }
                })
                ->html(),
            Column::make("Actions", "id")
                ->collapseOnTablet()
                ->view('admin.users.transaction_actions_view'),
        ];
    }


    // public function render()
    // {
    //     $transactions = Transaction::where('user_id', $this->userId)->get();
    //     return view('livewire.transactions-table', compact('transactions'));
    // }
}
