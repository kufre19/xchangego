<?php

namespace App\Http\Livewire;

use App\Models\Cron;
use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Illuminate\Support\Facades\Route;

class CronTable extends DataTableComponent
{

    public function builder(): Builder
    {
        return Cron::query()
            ->leftJoin('extensions', 'crons.extension_id', '=', 'extensions.id')
            ->where(function ($query) {
                $query->where('extensions.installed', '!=', 0)
                    ->orWhereNull('crons.extension_id');
            })
            ->where(function ($query) {
                $query->where(function ($query) {
                    foreach (Cron::all() as $cron) {
                        if (Route::has($cron->route)) {
                            $query->orWhere('crons.route', $cron->route);
                        }
                    }
                });
            })
            ->select('crons.*');
    }


    public function configure(): void
    {
        $this->setPrimaryKey('id')
            ->setEmptyMessage('No Cron Jobs found');
    }

    public function columns(): array
    {
        return [
            Column::make("ID", "id")
                ->hideIf(true),
            Column::make("Extension ID", "extension_id")
                ->hideIf(true),
            Column::make("Last Run", "last_run")
                ->view('admin.setting.views.cron.last_run'),
            Column::make("Title", "title")
                ->view('admin.setting.views.cron.title_view')
                ->searchable()
                ->sortable(),
            Column::make("URL", 'route')
                ->view('admin.setting.views.cron.url_view')
                ->searchable()
                ->sortable(),
            Column::make("Time", "time")
                ->sortable(),
            Column::make("Description", "description")
                ->searchable()
                ->sortable(),
        ];
    }
}
