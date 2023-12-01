<?php

namespace App\Http\Livewire;

use App\Models\InvestmentPlans;
use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Rappasoft\LaravelLivewireTables\Views\Filters\SelectFilter;
use Rappasoft\LaravelLivewireTables\Views\Columns\BooleanColumn;

class InvestmentPlansTable extends DataTableComponent
{
    public function builder(): Builder
    {
        return InvestmentPlans::query();
    }

    public function configure(): void
    {
        $this->setPrimaryKey('id')
            ->setDefaultSort('status', 'desc')
            ->setFilterLayoutSlideDown()
            ->setOfflineIndicatorEnabled()
            ->setEmptyMessage('No Investment Plan found');
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
            Column::make("Min Amount", "min_amount")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Max Amount", "max_amount")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Interest Rate", "interest_rate")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            BooleanColumn::make("Status", "status")
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Actions", "id")
                ->view('admin.investment.views.plans_actions'),
        ];
    }

    public function filters(): array
    {
        return [
            SelectFilter::make('Status')
                ->setFilterPillTitle('Status')
                ->setFilterPillValues([
                    ''    => 'Any',
                    '1' => 'Active',
                    '0'  => 'Disabled',
                ])
                ->options([
                    '' => 'All',
                    '1' => 'Active',
                    '0'  => 'Disabled',
                ])
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('investment_plans.status', $value);
                }),
        ];
    }
}
