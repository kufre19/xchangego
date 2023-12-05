<?php

namespace App\Http\Livewire\Ext\Bot;

use App\Exports\BotLogExport;
use App\Models\Bot\BotContract;
use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Rappasoft\LaravelLivewireTables\Views\Filters\SelectFilter;
use Rappasoft\LaravelLivewireTables\Views\Filters\DateFilter;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Gate;

class BotLogTable extends DataTableComponent
{

    public function builder(): Builder
    {
        return BotContract::query()->with(['user']);
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
            Column::make("Bot", "bot_id")
                ->searchable()
                ->collapseOnTablet()
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => isset($row->bot) ? '<a href="' . route('admin.bot.edit', $row->bot_id) . '" class="badge bg-danger">' . ucfirst($row->bot->title) . '</a>' : '<span class="badge bg-danger">' . __('Bot Not Found') . '</span>'
                )
                ->html(),
            Column::make("Currency", "symbol")
                ->hideIf(true),
            Column::make("Pair", "pair")
                ->searchable()
                ->collapseOnTablet()
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => $row->symbol . '/' . $row->pair
                )
                ->html(),
            Column::make("Amount", "amount")
                ->searchable()
                ->collapseOnTablet()
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => getamount($row->amount)
                )
                ->html(),
            Column::make("Profit", "profit")
                ->hideIf(true),
            Column::make("Result", "result")
                ->searchable()
                ->sortable()
                ->collapseOnMobile()
                ->view('extensions.admin.bot.result_view'),
            Column::make("Status", "status")
                ->searchable()
                ->sortable()
                ->collapseOnMobile()
                ->view('extensions.admin.bot.status_view'),
            Column::make("Start Date", "created_at")
                ->searchable()
                ->collapseOnTablet()
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => showDateTime($row->created_at, 'd M, Y h:i:s')
                )
                ->html(),
            Column::make("End Date", "end_date")
                ->searchable()
                ->collapseOnTablet()
                ->sortable()
                ->format(
                    fn ($value, $row, Column $column) => showDateTime($row->end_date, 'd M, Y h:i:s')
                )
                ->html(),
            Column::make("Actions", "id")
                ->collapseOnMobile()
                ->view('extensions.admin.bot.actions_view'),
        ];
    }

    public function filters(): array
    {
        return [
            SelectFilter::make('Status')
                ->setFilterPillTitle('Status')
                ->setFilterPillValues([
                    '2' => 'Adjusted',
                    '1' => 'Completed',
                    '0' => 'Running',
                ])
                ->options([
                    '' => 'All',
                    '2' => 'Adjusted',
                    '1' => 'Completed',
                    '0' => 'Running',
                ])
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('bot_contracts.status', $value);
                }),
            DateFilter::make('From')
                ->config([
                    'min' => '2020-01-01',
                    'max' => date('y-m-d'),
                ])
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('bot_contracts.created_at', '>=', $value);
                }),
            DateFilter::make('To')
                ->filter(function (Builder $builder, string $value) {
                    $builder->where('bot_contracts.created_at', '<=', $value);
                }),
        ];
    }
    public function bulkActions(): array
    {
        return [
            'export' => ['title' => 'Export', 'icon' =>  'download'],
            'delete' => ['title' => 'Delete', 'icon' =>  'x-lg'],
        ];
    }

    public function export()
    {
        $logs = $this->getSelected();
        Session::flash('alert', [
            'class' => 'success',
            'icon' => 'check-circle', /* danger: exclamation-triangle , success: check-circle, info: exclamation-circle */
            'header' => 'Alert!',
            'message' =>  'Logs Exported Successfully'
        ]);

        $this->clearSelected();
        return Excel::download(new BotLogExport($logs), 'bot_log.xlsx');
    }

    public function delete()
    {
        abort_if(Gate::denies('bot_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $names = '';
        $count = count($this->getSelected());
        $path = imagePath()['bot']['path'];
        foreach ($this->getSelected() as $id) {
            $item = BotContract::findOrFail($id);
            $names .= $item->id . ', ';
            if ($item->image != null) {
                unlink(public_path('/' . $path . '/' . $item->image));
            }
            $item->delete();
            $item->clearCache();
        }
        Session::flash('alert', [
            'class' => 'danger',
            'icon' => 'exclamation-triangle',
            'header' => 'Alert!',
            'message' =>  '(' . rtrim($names, ", ") . ') ' . ($count > 1 ? 'Bot Contracts' : 'Bot Contract') . ' Removed Successfully'
        ]);
        $this->clearSelected();
    }
}
