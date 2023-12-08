<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Scripts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ScriptsController extends Controller
{
    public function index()
    {
        $page_title = 'Scripts';
        return view('admin.setting.scripts', compact('page_title'));
    }

    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'title' => 'required',
            'code' => 'required',
        ]);
        if ($validate->fails()) {
            foreach (json_decode($validate->errors()) as $key => $error) {
                $notify[] = ['error', $error[0]];
            }
            return response()->json(
                [
                    'type' => $notify[0][0],
                    'message' => $notify[0][1]
                ]
            );
        }

        $script = new Scripts();
        $script->title = $request->title;
        $script->code = htmlspecialchars($request->code);
        $script->status = 1;
        $script->save();

        return response()->json(
            [
                'type' => 'success',
                'message' => 'Script created successfully.'
            ]
        );
    }

    public function update(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'id' => 'required',
            'title' => 'required',
            'code' => 'required',
        ]);
        if ($validate->fails()) {
            foreach (json_decode($validate->errors()) as $key => $error) {
                $notify[] = ['error', $error[0]];
            }
            return response()->json(
                [
                    'type' => $notify[0][0],
                    'message' => $notify[0][1]
                ]
            );
        }

        $script = Scripts::findOrFail($request->id);
        $script->title = $request->title;
        $script->code = htmlspecialchars($request->code);
        $script->save();


        return response()->json(
            [
                'type' => 'success',
                'message' => 'Script updated successfully.'
            ]
        );
    }
}
