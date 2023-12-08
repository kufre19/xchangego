<?php

namespace App\Http\Controllers\Admin\Extensions\MailWiz;

use App\Http\Controllers\Controller;
use App\Models\MailWiz\Block;
use App\Models\MailWiz\Template;
use Illuminate\Http\Request;

class TemplateController extends Controller
{
    public function index()
    {
        $page_title = 'Templates';
        return view('extensions.admin.mailwiz.templates.index', compact('page_title'));
    }

    public function create()
    {
        $page_title = 'Create Template';
        $blocksData = Block::get();
        $blocks = [];
        foreach ($blocksData as $block) {
            $blocks[] = json_decode($block->json, true);
        }
        return view('extensions.admin.mailwiz.templates.create', compact('page_title', 'blocks'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
        ], [
            'name.required' => 'The template name is required.',
            'name.max' => 'The template name must not exceed :max characters.',
        ]);

        if (Template::where('name', $request->name)->exists()) {
            return response()->json(
                [
                    'type' => 'error',
                    'message' => 'Template with this name already exists.',
                ]
            );
        }

        try {
            Template::create([
                'name' => $request->name,
                'design' => $request->design,
                'html' => $request->html,
            ]);

            return response()->json([
                'type' => 'success',
                'message' => 'Template stored successfully.',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }

    public function edit(Template $template)
    {
        $page_title = 'Edit Template - ' . $template->name;
        $design = json_decode($template->design, true);
        $blocksData = Block::get();
        $blocks = [];
        foreach ($blocksData as $block) {
            $blocks[] = json_decode($block->json, true);
        }
        return view('extensions.admin.mailwiz.templates.edit', compact('template', 'design', 'blocks', 'page_title'));
    }

    public function update(Request $request, Template $template)
    {
        $request->validate([
            'html' => 'required',
            'design' => 'required',
        ], [
            'html.required' => 'The template HTML is required.',
            'design.required' => 'The template design is required.',
        ]);

        try {
            $template->html = $request->html;
            $template->design = $request->design;
            $template->save();

            return response()->json([
                'type' => 'success',
                'message' => 'Template updated successfully.',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }

    public function rename(Request $request)
    {
        $request->validate([
            'template_id' => 'required',
            'name' => 'required|max:255',
        ], [
            'template_id.required' => 'The template ID is required.',
            'name.required' => 'The new template name is required.',
            'name.max' => 'The new template name must not exceed :max characters.',
        ]);

        try {
            $template = Template::find($request->template_id);
            $template->name = $request->name;
            $template->save();

            return response()->json([
                'type' => 'success',
                'message' => 'Template name updated successfully.',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'type' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }


    public function destroy(Template $template)
    {
        $template->delete();
        return redirect()->route('admin.mailwiz.templates.index')->with('success', 'Campaign deleted successfully.');
    }
}
