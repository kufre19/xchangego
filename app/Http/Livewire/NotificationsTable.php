<?php

namespace App\Http\Livewire;

use App\Models\AdminNotification;
use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Rappasoft\LaravelLivewireTables\Views\Columns\ButtonGroupColumn;
use Rappasoft\LaravelLivewireTables\Views\Columns\LinkColumn;

class NotificationsTable extends DataTableComponent
{
    public function builder(): Builder
    {
        return AdminNotification::query()->with(['user']);
    }

    public function configure(): void
    {
        $this->setPrimaryKey('id')
            ->setDefaultSort('created_at', 'desc')
            ->setFilterLayoutSlideDown()
            ->setOfflineIndicatorEnabled()
            ->setEmptyMessage('No notifications found');
    }

    public function columns(): array
    {
        return [
            Column::make('Title', 'title')
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            Column::make('Message', 'message')
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),

            Column::make("user", "user_id")
                ->hideIf(true),
            Column::make('User', 'user.username')
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),

            Column::make('Date', 'created_at')
                ->searchable()
                ->collapseOnTablet()
                ->sortable()
                ->format(fn ($value, $row, Column $column) => $row->created_at->format('d M, Y h:i:s'))
                ->html(),

            Column::make('Seen', 'read_status')
                ->collapseOnTablet()
                ->sortable()
                ->format(fn ($value, $row, Column $column) => $row->read_status == 1 ? '<span class="badge bg-success">Yes</span>' : '<span class="badge bg-danger">No</span>')
                ->html(),

            Column::make('id', 'id')
                ->hideIf(true),

            ButtonGroupColumn::make('Actions')
                ->buttons([
                    LinkColumn::make('View')
                        ->title(fn ($row) => 'View')
                        ->location(fn ($row) => route('admin.notification.read', $row->id))
                        ->attributes(function ($row) {
                            return [
                                'class' => 'btn btn-outline-primary btn-sm',
                            ];
                        }),
                ]),
        ];
    }
}
