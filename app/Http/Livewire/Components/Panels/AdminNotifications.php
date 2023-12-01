<?php

namespace App\Http\Livewire\Components\Panels;

use App\Models\AdminNotification;
use Livewire\Component;

class AdminNotifications extends Component
{
    public $readyToLoad = false;
    public $showModal = false;

    public function loadData()
    {
        $this->readyToLoad = true;
    }

    public function toggleModal()
    {
        $this->showModal = !$this->showModal;
    }

    public function render()
    {
        try {
            if ($this->readyToLoad) {
                $notifications = (new AdminNotification())->getCacheUnread(5);
                $count = (new AdminNotification())->countUnread();
                return view('livewire.components.panels.admin-notifications', [
                    'notifications' => $notifications,
                    'count' => $count
                ]);
            } else {
                return <<<'blade'
                    <div wire:init="loadData">
                    </div>
                blade;
            }
        } catch (\Exception $e) {
            return <<<'blade'
                <div wire:init="loadData">
                </div>
            blade;
        }
    }
}
