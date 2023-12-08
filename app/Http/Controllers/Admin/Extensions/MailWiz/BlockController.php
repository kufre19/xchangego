<?php

namespace App\Http\Controllers\Admin\Extensions\MailWiz;

use App\Http\Controllers\Controller;
use App\Models\MailWiz\Block;
use Illuminate\Http\Request;

class BlockController extends Controller
{

    public function index(Request $request)
    {
        return response()->json([
            'data' => [],
            'success' => true
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'json' => 'required',
        ]);

        try {
            Block::create([
                'block_id' => $request->id,
                'json' => $request->json,
            ]);

            return response()->json([
                'type' => 'success',
                'message' => 'Block stored successfully.',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }


    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'json' => 'required',
        ]);

        try {
            $json = json_decode($request->json, true);

            $block = Block::where('block_id', $request->id)->first();
            $blockJson = json_decode($block->json, true);
            $blockJson['tags'] = $json['tags'];
            $blockJson['category'] = $json['category'];
            $block->json = json_encode($blockJson);
            $block->save();

            return response()->json([
                'type' => 'success',
                'message' => 'Block updated successfully.',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }

    public function destroy(Request $request)
    {
        $block = Block::where('block_id', $request->id)->first();
        if ($block) {
            try {
                $block->delete();
                return response()->json([
                    'type' => 'success',
                    'message' => 'Block deleted successfully.',
                ]);
            } catch (\Throwable $th) {
                return response()->json([
                    'type' => 'error',
                    'message' => $th->getMessage(),
                ]);
            }
        }
        return response()->json([
            'type' => 'error',
            'message' => 'Block not found.',
        ]);
    }
}
