<?php

namespace App\Http\Livewire\Ext\ecommerce;

use App\Models\Ecommerce\EcommerceCategory;
use App\Models\Ecommerce\EcommerceProducts;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Rappasoft\LaravelLivewireTables\Views\Filters\DateFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Session;
use Rappasoft\LaravelLivewireTables\Views\Columns\BooleanColumn;

class ProductsTable extends DataTableComponent
{

    public $productId;

    public function openAddLicenseModal($productId)
    {
        $this->productId = $productId;
        $this->dispatchBrowserEvent('open-add-license-modal');
    }



    public function setProductId($productId)
    {
        $this->productId = $productId;
    }

    public function builder(): Builder
    {
        return EcommerceProducts::query()->with('category');
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
            Column::make("Id")
                ->format(function ($value, $row) {
                    static $counter = 1;
                    return $counter++;
                })
                ->sortable(),
            Column::make("Thumbnail", "thumbnail")
                ->collapseOnTablet()
                ->format(function ($value, $row, Column $column) {
                    $thumbnailPath = '';
                    if (!empty($row->thumbnail)) {
                        $thumbnailPath = getImage(
                            imagePath()['ecommerce_product_thumbnail']['path'] . '/' . $row->thumbnail,
                            imagePath()['ecommerce_product_thumbnail']['size']
                        );
                    }

                    return '<img src="' . $thumbnailPath . '" alt="Thumbnail" style="width: 50px; height: 50px;" />';
                })
                ->html(),
            Column::make("Category", "category_id")
                ->format(
                    fn ($value, $row, Column $column) => ($row->category ? '<a class="badge bg-primary" href="' . route('admin.ecommerce.category.index') . '">' . $row->category->name . '</a>' : 'N/A')
                )
                ->html(),
            Column::make("Name", "name")
                ->format(
                    fn ($value, $row, Column $column) => '<a class="badge bg-primary" href="' . route('admin.ecommerce.product.edit', $row->id) . '">' . $value . '</a>'
                )
                ->html()
                ->sortable(),


            // Column::make("Description", "description")
            //     ->format(function ($value, $row, Column $column) {
            //         $maxLength = 50;
            //         return strlen($value) > $maxLength ? substr($value, 0, $maxLength) . '...' : $value;
            //     })
            //     ->sortable(),

            Column::make("Price", "price")
                ->format(function ($value, $row, Column $column) {
                    return '$' . $value;
                })
                ->sortable(),
            Column::make("Discount", "discount")
                ->format(function ($value, $row, Column $column) {
                    return $value ? '$' . $value : '<span class="bg-yellow-500 text-white px-2 py-1 rounded">No Discount</span>';
                })
                ->html()
                ->sortable(),
            BooleanColumn::make("Hot Deals", "hot")
                ->collapseOnMobile()
                ->sortable(),
            BooleanColumn::make('Featured', 'featured')
                ->collapseOnMobile()
                ->sortable(),
            BooleanColumn::make('Status', 'status')
                ->collapseOnMobile()
                ->sortable(),
            Column::make("Actions", "id")
                ->view('extensions.admin.ecommerce.products.actions', ['id' => 'id']),
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
                    $builder->where('created_at', '>=', $value);
                }),
            DateFilter::make('To')
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('created_at', '<=', $value);
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
            $item = EcommerceCategory::findOrFail($id);
            $names .= $item->name . ', ';
            $item->status = 1;
            $item->save();
        }
        Session::flash('alert', [
            'class' => 'success',
            'icon' => 'check-circle', /* danger: exclamation-triangle , success: check-circle, info: exclamation-circle */
            'header' => 'Alert!',
            'message' =>  '(' . rtrim($names, ", ") . ') ' . ($count > 1 ? 'Products' : 'product') . ' Activated Successfully'
        ]);

        $this->clearSelected();
    }

    public function deactivate()
    {
        $names = '';
        $count = count($this->getSelected());
        foreach ($this->getSelected() as $id) {
            $item = EcommerceCategory::findOrFail($id);
            $names .= $item->name . ', ';
            $item->status = 0;
            $item->save();
        }
        Session::flash('alert', [
            'class' => 'danger',
            'icon' => 'exclamation-triangle',
            'header' => 'Alert!',
            'message' =>  '(' . rtrim($names, ", ") . ') ' . ($count > 1 ? 'Products' : 'product') . ' Deactivated Successfully'
        ]);
        $this->clearSelected();
    }

    public function delete()
    {
        $names = '';
        $count = count($this->getSelected());
        $path = imagePath()['ecommerce_product_thumbnail']['path'];
        foreach ($this->getSelected() as $id) {
            $item = EcommerceCategory::findOrFail($id);
            $names .= $item->name . ', ';
            if ($item->thumbnail != null) {
                try {

                    unlink(public_path('/' . $path . '/' . $item->thumbnail));
                } catch (\Throwable $th) {
                    //throw $th;
                }
            }
            $item->delete();
        }
        Session::flash('alert', [
            'class' => 'danger',
            'icon' => 'exclamation-triangle',
            'header' => 'Alert!',
            'message' =>  '(' . rtrim($names, ", ") . ') ' . ($count > 1 ? 'Products' : 'product') . ' Removed Successfully'
        ]);
        $this->clearSelected();
    }
}
