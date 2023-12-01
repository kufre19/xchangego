<?php

namespace App\Notify;

use App\Models\MailWiz\Campaign;
use Illuminate\Support\Collection;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class MailWizSend implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $campaign;
    protected $users;

    public function __construct(Campaign $campaign, Collection $users)
    {
        $this->campaign = $campaign;
        $this->users = $users;
    }

    public function handle()
    {
        $totalUsers = $this->users->count();
        $sentCount = 0;

        // Send the email to each recipient
        foreach ($this->users as $user) {
            Mail::to($user->email)->send(new MailWiz($this->campaign));
            $sentCount++;

            // Update the campaign progress
            $this->campaign->progress = round(($sentCount / $totalUsers) * 100);
            $this->campaign->save();

            // Delay between each email
            sleep(1);
        }

        // Update the campaign status to completed if all emails are sent
        if ($sentCount === $totalUsers) {
            $this->campaign->update(['status' => Campaign::STATUS_COMPLETED]);
        }
    }
}
