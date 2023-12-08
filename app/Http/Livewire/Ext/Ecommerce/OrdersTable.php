<?php

namespace App\Http\Livewire\Ext\ecommerce;

use App\Models\Ecommerce\EcommerceOrders;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Rappasoft\LaravelLivewireTables\Views\Filters\DateFilter;
use Illuminate\Database\Eloquent\Builder;


class OrdersTable extends DataTableComponent
{
    public function builder(): Builder
    {
        return EcommerceOrders::query()->with(['user']);
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
            Column::make("Product ID", "product_id")
                ->searchable()
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => '<a href="' . route('admin.ecommerce.product.edit', $row->product_id) . '" class="badge bg-primary bg-' . ($row->product->name ?? 'danger') . '">' . ucfirst($row->product->name ?? 'Product Not Found') . '</a>'
                )
                ->html(),
            Column::make("Order ID", "trx")
                ->sortable(),
            Column::make("License", "product_id")
                ->searchable()
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => $row->license->license ?? 'Not Found'
                )
                ->html(),
            Column::make("License", "product_id")
                ->searchable()
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => $row->license->activation === 1 ? '<span class="badge bg-success">Active</span>' : '<span class="badge bg-danger">Inactive</span>'
                )
                ->html(),
        ];
    }

    public function filters(): array
    {
        return [
            DateFilter::make('From')
                ->config([
                    'min' => '2020-01-01',
                    'max' => date('y-m-d'),
                ])
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('ecommerce_order.created_at', '>=', $value);
                }),
            DateFilter::make('To')
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('ecommerce_order.created_at', '<=', $value);
                }),
        ];
    }
}
