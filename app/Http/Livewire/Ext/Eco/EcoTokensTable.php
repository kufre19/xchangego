<?php

namespace App\Http\Livewire\Ext\Eco;

use App\Models\Eco\EcoNetworks;
use App\Models\Eco\EcoTokens;
use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Rappasoft\LaravelLivewireTables\Views\Filters\SelectFilter;
use Illuminate\Support\Facades\Session;

class EcoTokensTable extends DataTableComponent
{
    public $chain;
    public function mount($chain): void
    {
        $this->chain = $chain;
    }
    public function builder(): Builder
    {
        if (getNativeNetwork() == 'testnet') {
            $tokens = EcoTokens::query()
                ->with(['fees_account' => function ($query) {
                    $query->where('chain', $this->chain);
                }])
                ->where('chain', $this->chain)
                ->where('testnet', getenv('TESTNET_TYPE'));
        } else {
            $tokens = EcoTokens::query()
                ->with(['fees_account' => function ($query) {
                    $query->where('chain', $this->chain);
                }])
                ->where('chain', $this->chain)
                ->where('testnet', null);
        }
        return $tokens;
    }

    public function configure(): void
    {
        $this->setPrimaryKey('id')
            ->setDefaultSort('id', 'asc')
            ->setColumnSelectDisabled()
            ->setFilterLayoutSlideDown()
            ->setOfflineIndicatorEnabled()
            ->setEmptyMessage('No tokens found');
    }

    public function columns(): array
    {
        return [
            Column::make("Id", "id")
                ->hideIf(true),
            Column::make("Token", "symbol")
                ->view('extensions.admin.eco.views.tokens.symbol'),
            Column::make("withdraw_min", "withdraw_min")
                ->hideIf(true),
            Column::make("withdraw_max", "withdraw_max")
                ->hideIf(true),
            Column::make("Withdraw", "withdraw_fee")
                ->hideIf(true),
            Column::make("hash", "hash")
                ->hideIf(true),
            Column::make("Info", "actions")
                ->view('extensions.admin.eco.views.tokens.info'),
            Column::make('Contract', 'address')
                ->view('extensions.admin.eco.views.tokens.status'),
            Column::make('Status')
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => $row->dev != 1 ? ('<span class="badge bg-' . ($row->status == 1 ? 'success' : 'danger') . '">' . ($row->status == 1 ? 'Active' : 'Disabled') . '</span>') : '<span class="badge bg-secondary">In Development</span>'
                )
                ->html(),
            Column::make('Actions', 'chain')
                ->view('extensions.admin.eco.views.tokens.actions'),
        ];
    }

    public function filters(): array
    {
        return [
            SelectFilter::make('Active')
                ->setFilterPillTitle('User Status')
                ->setFilterPillValues([
                    '1' => 'Active',
                    '0' => 'Inactive',
                ])
                ->options([
                    '' => 'All',
                    '1' => 'Yes',
                    '0' => 'No',
                ])
                ->filter(function (Builder $builder, string $value) {
                    if ($value === '1') {
                        $builder->where('status', true);
                    } elseif ($value === '0') {
                        $builder->where('status', false);
                    }
                }),
        ];
    }

    public function bulkActions(): array
    {
        return [
            'activate' => ['title' => 'Activate', 'icon' =>  'eye'],
            'deactivate' => ['title' => 'Deactivate', 'icon' =>  'eye-slash'],
        ];
    }
    public function activate()
    {
        $names = '';
        $count = count($this->getSelected());
        foreach ($this->getSelected() as $id) {
            $item = EcoTokens::findOrFail($id);
            $names .= $item->name . ', ';
            $item->status = 1;
            $item->save();
        }
        Session::flash('alert', [
            'class' => 'success',
            'icon' => 'check-circle', /* danger: exclamation-triangle , success: check-circle, info: exclamation-circle */
            'header' => 'Alert!',
            'message' =>  '(' . rtrim($names, ", ") . ') ' . ($count > 1 ? 'Tokens' : 'Token') . ' Activated Successfully'
        ]);

        $this->clearSelected();
    }

    public function deactivate()
    {
        $names = '';
        $count = count($this->getSelected());
        foreach ($this->getSelected() as $id) {
            $item = EcoTokens::findOrFail($id);
            $names .= $item->name . ', ';
            $item->status = 0;
            $item->save();
        }
        Session::flash('alert', [
            'class' => 'danger',
            'icon' => 'exclamation-triangle',
            'header' => 'Alert!',
            'message' =>  '(' . rtrim($names, ", ") . ') ' . ($count > 1 ? 'Tokens' : 'Token') . ' Deactivated Successfully'
        ]);
        $this->clearSelected();
    }
}
