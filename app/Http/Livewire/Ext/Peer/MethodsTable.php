<?php

namespace App\Http\Livewire\Ext\Peer;

use App\Models\P2P\P2PPaymentMethod;
use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Rappasoft\LaravelLivewireTables\Views\Columns\BooleanColumn;

class MethodsTable extends DataTableComponent
{
    public $userid;

    public function builder(): Builder
    {
        if ($this->userid != null) {
            return P2PPaymentMethod::query()->where('user_id', $this->userid);
        } else {
            return P2PPaymentMethod::query();
        }
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
            Column::make("Name", "name")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Description", "description")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Fiat", "fiat")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            BooleanColumn::make('Status')
                ->collapseOnMobile()
                ->sortable(),
        ];
    }
}
