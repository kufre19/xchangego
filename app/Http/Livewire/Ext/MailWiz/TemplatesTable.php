<?php

namespace App\Http\Livewire\Ext\MailWiz;

use App\Models\MailWiz\Template;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;

class TemplatesTable extends DataTableComponent
{
    protected $model = Template::class;

    public function configure(): void
    {
        $this->setPrimaryKey('id')
            ->setColumnSelectDisabled()
            ->setFilterLayoutSlideDown()
            ->setOfflineIndicatorEnabled()
            ->setEmptyMessage('No templates found');
    }

    public function columns(): array
    {
        return [
            Column::make('ID', 'id')
                ->sortable(),
            Column::make('Name', 'name')
                ->searchable()
                ->sortable(),
            Column::make('Actions', 'id')
                ->collapseOnMobile()
                ->view('extensions.admin.mailwiz.templates.views.actions'),
        ];
    }
}
