<?php

namespace App\Http\Controllers\Admin\Extensions\MailWiz;

use App\Http\Controllers\Controller;
use App\Models\MailWiz\Campaign;
use App\Models\MailWiz\Template;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;

class CampaignController extends Controller
{
    public function index()
    {
        $campaigns = Campaign::all();
        $users = User::all();
        $page_title = 'Campaigns';
        return view('extensions.admin.mailwiz.campaigns.index', compact('campaigns', 'users', 'page_title'));
    }

    public function create()
    {
        $users = User::select(['id', 'name', 'email'])->get();
        $templates = Template::all();
        $page_title = 'Create Campaign';
        return view('extensions.admin.mailwiz.campaigns.create', compact('templates', 'users', 'page_title'));
    }

    public function edit(Campaign $campaign)
    {
        $users = User::select(['id', 'name', 'email'])->get();
        $targets = json_decode($campaign->target, true);
        $templates = Template::all();
        $page_title = 'Edit Campaign - ' . $campaign->name;
        return view('extensions.admin.mailwiz.campaigns.edit', compact('campaign', 'users', 'targets', 'templates', 'page_title'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'users' => 'required',
            'template_id' => 'required',
            'subject' => 'required',
        ], [
            'name.required' => 'Please enter a name.',
            'users.required' => 'Please select at least one user.',
            'template_id.required' => 'Please select a template.',
            'subject.required' => 'Please enter a subject.',
        ]);

        Campaign::create([
            'name' => $request->input('name'),
            'status' => Campaign::STATUS_PENDING,
            'progress' => 0,
            'template_id' => $request->input('template_id'),
            'target' => json_encode($request->input('users')),
            'subject' => $request->input('subject'),
        ]);

        $notify[] = ['success', 'Campaign created successfully.'];
        return redirect()->route('admin.mailwiz.campaigns.index')->withNotify($notify);
    }

    public function update(Request $request, Campaign $campaign)
    {
        $request->validate([
            'name' => 'required',
            'users' => 'required',
            'template_id' => 'required',
            'subject' => 'required',
        ], [
            'name.required' => 'Please enter a name.',
            'users.required' => 'Please select at least one user.',
            'template_id.required' => 'Please select a template.',
            'subject.required' => 'Please enter a subject.',
        ]);

        $campaign->update([
            'name' => $request->input('name'),
            'template_id' => $request->input('template_id'),
            'target' => json_encode($request->input('users')),
            'subject' => $request->input('subject'),
        ]);

        $notify[] = ['success', 'Campaign updated successfully.'];
        return redirect()->route('admin.mailwiz.campaigns.index')->withNotify($notify);
    }

    public function destroy(Campaign $campaign)
    {
        $campaign->delete();
        $notify[] = ['success', 'Campaign deleted successfully.'];
        return redirect()->route('admin.mailwiz.campaigns.index')->withNotify($notify);
    }

    public function start(Campaign $campaign)
    {
        $campaign->update(['status' => Campaign::STATUS_ACTIVE]);
        $notify[] = ['success', 'Campaign paused successfully.'];
        return back()->withNotify($notify);
    }

    public function restart(Campaign $campaign)
    {
        $campaign->update(['status' => Campaign::STATUS_ACTIVE, 'progress' => 0, 'done_targets' => null]);
        $notify[] = ['success', 'Campaign paused successfully.'];
        return back()->withNotify($notify);
    }

    public function pause(Campaign $campaign)
    {
        $campaign->update(['status' => Campaign::STATUS_PAUSED]);
        $notify[] = ['success', 'Campaign paused successfully.'];
        return back()->withNotify($notify);
    }

    public function resume(Campaign $campaign)
    {
        $campaign->update(['status' => Campaign::STATUS_ACTIVE]);
        $notify[] = ['success', 'Campaign resumed successfully.'];
        return back()->withNotify($notify);
    }

    public function stop(Campaign $campaign)
    {
        $campaign->update(['status' => Campaign::STATUS_STOPPED]);
        $notify[] = ['success', 'Campaign stopped successfully.'];
        return back()->withNotify($notify);
    }

    public function targets(Request $request, Campaign $campaign)
    {
        $users = $request->input('users');
        $campaign->update(['target' => json_encode($users)]);
        $notify[] = ['success', 'Campaign targets set successfully.'];
        return redirect()->route('campaigns.index')->withNotify($notify);
    }

    public function getAllCampaignsProgress()
    {
        $campaigns = Campaign::all();
        $campaignsProgress = $campaigns->map(function ($campaign) {
            return [
                'id' => $campaign->id,
                'progress' => $campaign->progress,
                'status_label' => $campaign->getStatusLabel(),
            ];
        });

        return response()->json($campaignsProgress);
    }

    // cron
    public function cron()
    {
        $campaign = Campaign::where('status', Campaign::STATUS_ACTIVE)
            ->where('target', '!=', null)
            ->first();

        if ($campaign) {
            // Retrieve the notification settings
            $notification = getNotify();
            $method = $notification->mail_config->name;
            $config = $notification->mail_config->{$method};

            // Set the mailer using the SMTP settings
            Config::set('mail.mailers.smtp.host', $config->host);
            Config::set('mail.mailers.smtp.port', $config->port);
            Config::set('mail.mailers.smtp.encryption', $config->enc);
            Config::set('mail.mailers.smtp.username', $config->username);
            Config::set('mail.mailers.smtp.password', $config->password);

            // Set the "From" address
            $from = $notification->email_from;
            Config::set('mail.from.address', $from);

            // Retrieve campaign targets and other variables
            $targets = json_decode($campaign->target, true);
            $total = is_array($targets) ? count($targets) : 0;
            $max = 100;
            $speed = $total > $campaign->speed ? $campaign->speed : $total;

            $done_targets = json_decode($campaign->done_targets, true);
            $total_done_targets = is_array($done_targets) ? count($done_targets) : 0;

            if ($total_done_targets > 0) {
                $targets = array_diff($targets, $done_targets);
                $targets = array_values($targets);
            }

            // If there are no remaining targets, set the campaign status to completed
            if (count($targets) === 0) {
                $campaign->update(['status' => Campaign::STATUS_COMPLETED]);
                return;
            }

            for ($i = 0; $i < $speed; $i++) {
                // Send the email
                $user = User::find($targets[$i]);
                Mail::to($user->email)->send(new MailJob($campaign));

                // Update the campaign progress
                $current_percentage = ($campaign->progress / $max) * 100;
                if ($current_percentage >= 100) {
                    $campaign->update(['progress' => $max]);
                    $campaign->update(['status' => Campaign::STATUS_COMPLETED]);
                    break;
                } else {
                    $campaign->update(['progress' => $campaign->progress + (1 / $total * 100)]);
                }

                // Save the last target done
                $done_targets[] = $targets[$i];
                $campaign->update(['done_targets' => json_encode($done_targets)]);

                if (count($done_targets) === count($targets)) {
                    $campaign->update(['status' => Campaign::STATUS_COMPLETED]);
                }
            }
        }

        cronLastRun('mailwiz_send');
    }
}
