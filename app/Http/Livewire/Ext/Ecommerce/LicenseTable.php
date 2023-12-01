<?php

namespace App\Http\Livewire\Ext\ecommerce;

use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Rappasoft\LaravelLivewireTables\Views\Columns\BooleanColumn;
use Rappasoft\LaravelLivewireTables\Views\Filters\SelectFilter;
use Illuminate\Support\Facades\Session;
use App\Models\Ecommerce\EcommerceLicense;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Gate;

class LicenseTable extends DataTableComponent
{
    public string $idx;
    public function builder(): Builder
    {
        return EcommerceLicense::query()->with(['user'])->where('product_id', $this->idx);
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
            Column::make("Product ID", "product_id")
                ->searchable()
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => '<a href="' . route('admin.ecommerce.product.edit', $row->product_id) . '" class="badge bg-primary bg-' . ($row->product->name ?? 'danger') . '">' . ucfirst($row->product->name ?? 'Product Not Found') . '</a>'
                )
                ->html(),
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
            Column::make('License Name', "license")
                ->searchable()
                ->sortable(),
            Column::make('Transaction', "trx")
                ->searchable()
                ->sortable(),
            BooleanColumn::make('Status')
                ->collapseOnMobile()
                ->sortable(),
            Column::make('Actions', 'id')
                ->collapseOnMobile()
                ->view('extensions.admin.ecommerce.products.license_actions'),
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
                        $builder->where('status', 1);
                    } elseif ($value === '0') {
                        $builder->where('status', 0);
                    }
                }),
        ];
    }
    public function bulkActions(): array
    {
        return [
            'activate' => ['title' => 'Activate', 'icon' =>  'check-circle'],
            'deactivate' => ['title' => 'Deactivate', 'icon' =>  'eye-slash'],
            'delete' => ['title' => 'Delete', 'icon' =>  'x-lg'],
        ];
    }
    public function activate()
    {
        $names = '';
        $count = count($this->getSelected());
        foreach ($this->getSelected() as $id) {
            $item = EcommerceLicense::findOrFail($id);
            $names .= $item->id . ', ';
            $item->status = 1;
            $item->save();
        }
        Session::flash('alert', [
            'class' => 'success',
            'icon' => 'check-circle', /* danger: exclamation-triangle , success: check-circle, info: exclamation-circle */
            'header' => 'Alert!',
            'message' =>  '(' . rtrim($names, ", ") . ') ' . ($count > 1 ? 'Licenses' : 'License') . ' Activated Successfully'
        ]);

        $this->clearSelected();
    }

    public function deactivate()
    {
        $names = '';
        $count = count($this->getSelected());
        foreach ($this->getSelected() as $id) {
            $item = EcommerceLicense::findOrFail($id);
            $names .= $item->id . ', ';
            $item->status = 0;
            $item->save();
        }
        Session::flash('alert', [
            'class' => 'danger',
            'icon' => 'exclamation-triangle',
            'header' => 'Alert!',
            'message' =>  '(' . rtrim($names, ", ") . ') ' . ($count > 1 ? 'Licenses' : 'License') . ' Deactivated Successfully'
        ]);
        $this->clearSelected();
    }

    public function delete()
    {
        abort_if(Gate::denies('user_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $names = '';
        $count = count($this->getSelected());
        foreach ($this->getSelected() as $id) {
            $item = EcommerceLicense::findOrFail($id);
            $names .= $item->id . ', ';
            $item->delete();
        }
        Session::flash('alert', [
            'class' => 'danger',
            'icon' => 'exclamation-triangle',
            'header' => 'Alert!',
            'message' =>  '(' . rtrim($names, ", ") . ') ' . ($count > 1 ? 'Licenses' : 'License') . ' Removed Successfully'
        ]);
        $this->clearSelected();
    }
}
