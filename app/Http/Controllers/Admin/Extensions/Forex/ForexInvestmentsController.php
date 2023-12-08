<?php

namespace App\Http\Controllers\Admin\Extensions\Forex;

use App\Http\Controllers\Controller;
use App\Models\Forex\ForexInvestments;
use App\Models\Forex\ForexLogs;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;

class ForexInvestmentsController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('forex_investments_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $page_title = 'Forex Investment Plans';
        return view('extensions.admin.forex.investment.index', compact('page_title'));
    }

    public function new()
    {
        abort_if(Gate::denies('forex_investments_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $page_title = 'New Plan';
        return view('extensions.admin.forex.investment.new', compact('page_title'));
    }

    public function edit($id)
    {
        abort_if(Gate::denies('forex_investments_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $plan = ForexInvestments::findOrFail($id);
        $page_title = 'Forex Plan Editor';
        return view('extensions.admin.forex.investment.edit', compact('page_title', 'plan'));
    }

    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'title' => 'required|max:80',
            'price' => 'required|numeric',
            'min' => 'required|numeric',
            'max' => 'required|numeric',
            'duration' => 'required|numeric',
            'roi' => 'required|numeric',
            'profit_missed' => 'required|numeric',
            'result_missed' => 'required',
            'image' => 'mimes:jpeg,jpg,png,svg',
            'desc' => 'required'
        ]);

        if ($validate->fails()) {
            return responseJson('error', $validate->errors()->first());
        }

        try {
            $plan = new ForexInvestments();
            $plan->fill($request->except('image', 'status', 'is_new'));
            $path = imagePath()['forex_investment']['path'];

            if ($request->hasFile('image')) {
                try {
                    $filename = uploadImg($request->image, $path);
                    $plan->image = $filename;
                } catch (\Exception $exp) {
                    return responseJson('error', 'Image could not be uploaded.');
                }
            }

            $plan->status = $request->status ?? 0;
            $plan->is_new = $request->is_new ?? 0;
            $plan->save();
            $plan->clearCache();

            return responseJson('success', 'Forex Plan has been Updated');
        } catch (\Throwable $th) {
            return responseJson('error', $th->getMessage());
        }
    }

    public function update(Request $request)
    {
        $request->validate([
            'title' => 'required|max:80',
            'price' => 'required|numeric',
            'min' => 'required|numeric',
            'max' => 'required|numeric',
            'duration' => 'required|numeric',
            'roi' => 'required|numeric',
            'profit_missed' => 'required|numeric',
            'result_missed' => 'required',
            'image' => 'mimes:jpeg,jpg,png,svg',
            'desc' => 'required'
        ]);

        $plan = ForexInvestments::findOrFail($request->id);
        $plan->fill($request->except('image'));

        $path = imagePath()['forex_investment']['path'];
        if ($request->hasFile('image')) {
            if ($plan->image != null) {
                try {
                    unlink(public_path('/' . $path . '/' . $plan->image));
                } catch (\Throwable $th) {
                    // do nothing
                }
            }

            try {
                $filename = uploadImg($request->image, $path);
                $plan->image = $filename;
            } catch (\Exception $exp) {
                $notify[] = ['error', 'Image could not be uploaded.'];
                return back()->withNotify($notify);
            }
        }

        $plan->save();
        $plan->clearCache();

        $notify[] = ['success', 'Forex Plan has been Updated'];
        return back()->withNotify($notify);
    }

    public function log()
    {
        abort_if(Gate::denies('forex_investments_log'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $page_title = "Forex Investment Logs";
        return view('extensions.admin.forex.investment.log', compact('page_title'));
    }

    public function set(Request $request)
    {
        try {
            $log = ForexLogs::where('id', $request->log_id)->first();
            if ($request->type == 1) {
                $log->profit = $request->profit;
            } elseif ($request->type == 2) {
                $log->profit = $log->amount * ($request->profit / 100);
            }
            $log->result = $request->result;
            $log->status = '2';
            $log->save();
            $log->clearCache();

            $notify[] = ['success', 'Profit has been adjusted successfully'];
        } catch (\Throwable $th) {
            return response()->json(
                [
                    'success' => true,
                    'type' => 'error',
                    'message' => $th
                ]
            );
        }
        return response()->json(
            [
                'success' => true,
                'type' => $notify[0][0],
                'message' => $notify[0][1]
            ]
        );
    }
}
