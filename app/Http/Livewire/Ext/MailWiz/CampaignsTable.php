<?php

namespace App\Http\Livewire\Ext\MailWiz;

use App\Models\MailWiz\Campaign;
use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\DataTableComponent;
use Rappasoft\LaravelLivewireTables\Views\Column;
use Rappasoft\LaravelLivewireTables\Views\Columns\ButtonGroupColumn;
use Rappasoft\LaravelLivewireTables\Views\Filters\SelectFilter;

class CampaignsTable extends DataTableComponent
{
    protected $model = Campaign::class;

    public function configure(): void
    {
        $this->setPrimaryKey('id')
            ->setColumnSelectDisabled()
            ->setFilterLayoutSlideDown()
            ->setOfflineIndicatorEnabled()
            ->setEmptyMessage('No campaigns found');
    }

    public function columns(): array
    {
        return [
            Column::make('ID', 'id')
                ->sortable(),
            Column::make('Name', 'name')
                ->searchable()
                ->sortable(),
            Column::make('Status', 'status')
                ->format(function ($value, $row) {
                    $statusColors = [
                        Campaign::STATUS_PENDING => 'bg-warning',
                        Campaign::STATUS_ACTIVE => 'bg-success',
                        Campaign::STATUS_PAUSED => 'bg-info',
                        Campaign::STATUS_COMPLETED => 'bg-secondary',
                        Campaign::STATUS_STOPPED => 'bg-danger',
                    ];

                    $statusColor = $statusColors[$row->status] ?? 'bg-gray-300';
                    return '<div><span class="badge  status-label ' . $statusColor . '" data-campaign-id="' . $row->id . '">' . $row->getStatusLabel() . '</span><div>';
                })
                ->html()
                ->searchable()
                ->sortable(),
            Column::make('Progress', 'progress')
                ->sortable()
                ->collapseOnMobile()
                ->view('extensions.admin.mailwiz.campaigns.views.progress'),
            Column::make('Actions', 'id')
                ->collapseOnMobile()
                ->view('extensions.admin.mailwiz.campaigns.views.actions'),
            Column::make('', 'id')
                ->collapseOnMobile()
                ->view('extensions.admin.mailwiz.campaigns.views.play'),
        ];
    }

    // Add filters if needed
    public function filters(): array
    {
        return [
            // Example filter for campaign status
            SelectFilter::make('Status')
                ->setFilterPillTitle('Campaign Status')
                ->options([
                    '' => 'All',
                    Campaign::STATUS_PENDING => 'Pending',
                    Campaign::STATUS_ACTIVE => 'Active',
                    Campaign::STATUS_PAUSED => 'Paused',
                    Campaign::STATUS_COMPLETED => 'Completed',
                    Campaign::STATUS_STOPPED => 'Stopped',
                ])
                ->filter(function (Builder $builder, string $value) {
                    if ($value !== '') {
                        $builder->where('status', $value);
                    }
                }),
        ];
    }

    // public function bulkActions(): array
    // {
    //     return [
    //         'activate' => ['title' => 'Activate', 'icon' =>  'eye'],
    //         'deactivate' => ['title' => 'Deactivate', 'icon' =>  'eye-slash'],
    //         'delete' => ['title' => 'Delete', 'icon' =>  'x-lg'],
    //     ];
    // }
    // public function activate()
    // {
    //     $names = '';
    //     $count = count($this->getSelected());
    //     foreach ($this->getSelected() as $id) {
    //         $item = Bot::findOrFail($id);
    //         $names .= $item->title . ', ';
    //         $item->status = 1;
    //         $item->save();
    //         $item->clearCache();
    //     }
    //     Session::flash('alert', [
    //         'class' => 'success',
    //         'icon' => 'check-circle', /* danger: exclamation-triangle , success: check-circle, info: exclamation-circle */
    //         'header' => 'Alert!',
    //         'message' =>  '(' . rtrim($names, ", ") . ') ' . ($count > 1 ? 'Bots' : 'Bot') . ' Activated Successfully'
    //     ]);

    //     $this->clearSelected();
    // }

    // public function deactivate()
    // {
    //     $names = '';
    //     $count = count($this->getSelected());
    //     foreach ($this->getSelected() as $id) {
    //         $item = Bot::findOrFail($id);
    //         $names .= $item->title . ', ';
    //         $item->status = 0;
    //         $item->save();
    //         $item->clearCache();
    //     }
    //     Session::flash('alert', [
    //         'class' => 'danger',
    //         'icon' => 'exclamation-triangle',
    //         'header' => 'Alert!',
    //         'message' =>  '(' . rtrim($names, ", ") . ') ' . ($count > 1 ? 'Bots' : 'Bot') . ' Deactivated Successfully'
    //     ]);
    //     $this->clearSelected();
    // }

    // public function delete()
    // {
    //     abort_if(Gate::denies('bot_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');
    //     $names = '';
    //     $count = count($this->getSelected());
    //     $path = imagePath()['bot']['path'];
    //     foreach ($this->getSelected() as $id) {
    //         $item = Bot::findOrFail($id);
    //         $names .= $item->title . ', ';
    //         if ($item->image != null) {
    //             unlink(public_path('/' . $path . '/' . $item->image));
    //         }
    //         $item->delete();
    //         $item->clearCache();
    //     }
    //     Session::flash('alert', [
    //         'class' => 'danger',
    //         'icon' => 'exclamation-triangle',
    //         'header' => 'Alert!',
    //         'message' =>  '(' . rtrim($names, ", ") . ') ' . ($count > 1 ? 'Bots' : 'Bot') . ' Removed Successfully'
    //     ]);
    //     $this->clearSelected();
    // }
}
