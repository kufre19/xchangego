<?php

namespace App\Http\Controllers\Admin\Extensions\Ecommerce;

use App\Http\Controllers\Controller;
use App\Models\Ecommerce\EcommerceCategory;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = EcommerceCategory::latest()->get();
        $page_title = 'Categories';
        return view('extensions.admin.ecommerce.categories.index', compact('categories', 'page_title'));
    }
    public function create()
    {
        $page_title = 'Create Category';
        return view('extensions.admin.ecommerce.categories.create', compact('page_title'));
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:80',
            'icon' => 'required|string'
        ]);

        $slug = strtolower(str_replace(' ', '-', $request->name));


        $category = new EcommerceCategory([
            'name' => $request->name,
            'slug' => $slug,
            'icon' => str_replace("bi bi-", "", $request->icon),
        ]);

        $category->save();

        return redirect()->route('admin.ecommerce.category.index')->with(['success', 'Category Inserted Successfully']);
    }

    public function edit($id)
    {
        $category = EcommerceCategory::findOrFail($id);
        return view('extensions.admin.ecommerce.categories.edit', compact('category'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'category_name' => 'required|string|max:80',
            'icon' => 'required|string'
        ]);

        $category = EcommerceCategory::findOrFail($id);
        $category->name = $request->category_name;
        $category->icon = str_replace("bi bi-", "", $request->icon);
        $category->save();

        return redirect()->route('admin.ecommerce.category.index')
            ->with('success', 'Category updated successfully');
    }
}
