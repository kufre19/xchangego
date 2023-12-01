<?php

namespace App\Http\Controllers\Admin;

use App\Events\TerminalOutput;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Gate;

class TestController extends Controller
{
    public function index()
    {
        $page_title = 'System Tests';
        $requirements = $this->systemRequirements();
        return view('admin.test.index', compact('page_title', 'requirements'));
    }

    public function terminal()
    {
        abort_if(Gate::denies('terminal_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $page_title = 'Terminal';
        return view('admin.terminal', compact('page_title'));
    }

    // $envoyPath = getenv('COMPOSER_HOME') . '/vendor/bin/envoy';

    public function runCommand(Request $request, $command)
    {
        $allowedCommands = [
            'optimize-clear' => 'optimize_clear',
            'storage-link' => 'storage_link',
            'yarn' => 'yarn',
            'yarn-build' => 'yarn_build',
            'composer-update' => 'composer_update',
        ];

        if (!array_key_exists($command, $allowedCommands)) {
            abort(403);
        }

        $task = $allowedCommands[$command];

        $envoyPath = base_path('vendor/bin/envoy');

        $commandLine = [$envoyPath, 'run', $task];

        // Create and configure the process
        $process = new Process($commandLine);
        $process->setTimeout(null);
        // Run the process and send the output to the frontend in real-time
        $process->run(function ($type, $buffer) {
            event(new TerminalOutput($type, $buffer));
        });
    }


    public function cors(Request $request)
    {
        $url = $request->input('url', getGen()->cors);

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_NOBODY, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode >= 200 && $httpCode < 300) {
            $notify = ['status' => 'success', 'message' => 'The CORS link is working'];
        } else {
            $notify = ['status' => 'error', 'message' => 'The CORS link is not working'];
        }

        return back()->with($notify);
    }

    public function systemRequirements()
    {
        $requirements = [
            'memory' => [
                'minimum' => 4 * 1024 * 1024 * 1024, // 4 GB in bytes
                'actual' => $this->getSystemMemory(),
                'status' => true,
            ],
        ];

        foreach ($requirements as $key => $requirement) {
            $requirements[$key]['status'] = $requirement['actual'] >= $requirement['minimum'];
        }

        return $requirements;
    }

    protected function getSystemMemory()
    {
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            $output = [];
            exec('wmic os get TotalVisibleMemorySize /Value', $output);

            if (!empty($output) && preg_match('/\d+/', $output[1], $matches)) {
                return intval($matches[0]) * 1024; // Convert to bytes
            }

            return 0;
        }

        return intval(shell_exec("grep MemTotal /proc/meminfo | awk '{print $2}'")) * 1024; // Convert to bytes
    }
}
