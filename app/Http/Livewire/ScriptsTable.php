<?php

namespace App\Http\Livewire;

use App\Models\Scripts;
use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Rappasoft\LaravelLivewireTables\Views\Filters\SelectFilter;
use Rappasoft\LaravelLivewireTables\Views\Columns\BooleanColumn;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Response;

class ScriptsTable extends DataTableComponent
{
    public function builder(): Builder
    {
        return Scripts::query();
    }

    public function configure(): void
    {
        $this->setPrimaryKey('id')
            ->setDefaultSort('status', 'desc')
            ->setFilterLayoutSlideDown()
            ->setOfflineIndicatorEnabled()
            ->setEmptyMessage('No Scripts found');
    }

    public function columns(): array
    {
        return [
            Column::make("Id", "id")
                ->sortable(),
            Column::make("Title", "title")
                ->searchable()
                ->sortable(),
            Column::make("Code", "code")
                ->hideIf(true),
            BooleanColumn::make("Status", "status")
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Actions", "id")
                ->view('admin.setting.views.script.actions'), // Update this view path to the correct one
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
                    $builder->where('status', $value);
                }),
        ];
    }

    public function bulkActions(): array
    {
        return [
            'activate' => ['title' => 'Activate', 'icon' => 'eye'],
            'deactivate' => ['title' => 'Deactivate', 'icon' => 'eye-slash'],
            'delete' => ['title' => 'Delete', 'icon' => 'x-lg'],
        ];
    }

    public function activate()
    {
        $names = '';
        $count = count($this->getSelected());
        foreach ($this->getSelected() as $id) {
            $item = Scripts::findOrFail($id);
            $names .= $item->title . ', ';
            $item->status = 1;
            $item->save();
            $item->clearCache();
        }
        Session::flash('alert', [
            'class' => 'success',
            'icon' => 'check-circle',
            'header' => 'Alert!',
            'message' =>  '(' . rtrim($names, ", ") . ') ' . ($count > 1 ? 'Scripts' : 'Script') . ' Activated Successfully'
        ]);

        $this->clearSelected();
    }

    public function deactivate()
    {
        $names = '';
        $count = count($this->getSelected());
        foreach ($this->getSelected() as $id) {
            $item = Scripts::findOrFail($id);
            $names .= $item->title . ', ';
            $item->status = 0;
            $item->save();
            $item->clearCache();
        }
        Session::flash('alert', [
            'class' => 'danger',
            'icon' => 'exclamation-triangle',
            'header' => 'Alert!',
            'message' =>  '(' . rtrim($names, ", ") . ') ' . ($count > 1 ? 'Scripts' : 'Script') . ' Deactivated Successfully'
        ]);
        $this->clearSelected();
    }

    public function delete()
    {
        $names = '';
        $count = count($this->getSelected());
        foreach ($this->getSelected() as $id) {
            $item = Scripts::findOrFail($id);
            $names .= $item->title . ', ';
            $item->delete();
            $item->clearCache();
        }
        Session::flash('alert', [
            'class' => 'danger',
            'icon' => 'exclamation-triangle',
            'header' => 'Alert!',
            'message' =>  '(' . rtrim($names, ", ") . ') ' . ($count > 1 ? 'Scripts' : 'Script') . ' Removed Successfully'
        ]);
        $this->clearSelected();
    }
}
