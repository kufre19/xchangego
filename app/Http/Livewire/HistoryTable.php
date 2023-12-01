<?php

namespace App\Http\Livewire;

use App\Models\UserLogin;
use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;

class HistoryTable extends DataTableComponent
{

    public function builder(): Builder
    {
        return UserLogin::query()->with(['user']);
    }

    public function configure(): void
    {
        $this->setPrimaryKey('id')
            ->setDefaultSort('id', 'desc')
            ->setFilterLayoutSlideDown()
            ->setOfflineIndicatorEnabled()
            ->setEmptyMessage('No history found');
    }

    public function columns(): array
    {
        return [
            Column::make("Id", "id")
                ->hideIf(true),
            Column::make("Date", "created_at")
                ->searchable()
                ->collapseOnTablet()
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => diffForHumans($row->created_at, 'd M, Y h:i:s')
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
            Column::make("IP Address", "user_ip")
                ->searchable()
                ->collapseOnTablet()
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => '<a href="' . route('admin.report.login.ipHistory', [$row->user_ip]) . '">' . $row->user_ip . '</a>'
                )
                ->html(),
            Column::make("Browser", "browser")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Platform", "os")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Country", "country")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),
            Column::make("Address", "location")
                ->searchable()
                ->collapseOnTablet()
                ->sortable(),

        ];
    }
}
