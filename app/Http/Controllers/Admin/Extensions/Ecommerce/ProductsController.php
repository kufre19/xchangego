<?php

namespace App\Http\Controllers\Admin\Extensions\Ecommerce;

use App\Http\Controllers\Controller;
use App\Models\Ecommerce\EcommerceCategory;
use App\Models\Ecommerce\EcommerceLicense;
use App\Models\Ecommerce\EcommerceProducts;
use App\Models\Ecommerce\EcommerceTags;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductsController extends Controller
{
    public function index()
    {
        $products = EcommerceProducts::latest()->get();
        $page_title = 'Products';
        return view('extensions.admin.ecommerce.products.index', compact('products', 'page_title'));
    }

    public function create()
    {
        $page_title = 'Create Category';
        $categories = EcommerceCategory::latest()->get();
        return view('extensions.admin.ecommerce.products.create', compact('page_title', 'categories'));
    }


    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:ecommerce_categories,id',
            'name' => 'required|max:255',
            'price' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'thumbnail' => 'nullable|image',
            'description' => 'nullable',
            'hot' => 'nullable|boolean',
            'featured' => 'nullable|boolean',
            'tags' => 'nullable',
        ]);


        $product = new EcommerceProducts();
        $product->category_id = $request->category_id;
        $product->name = $request->name;
        $product->discount = $request->discount;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->hot = $request->hot;
        $product->featured = $request->featured;



        $path = imagePath()['ecommerce_product_thumbnail']['path'];
        $size = imagePath()['ecommerce_product_thumbnail']['size'];

        if ($request->hasFile('thumbnail')) {
            try {
                $filename = uploadImg($request->thumbnail, $path, $size);
            } catch (\Exception $exp) {
                $notify[] = ['error', 'Image could not be uploaded.'];
                return back()->withNotify($notify);
            }
            $product->thumbnail = $filename;
        }

        $product->slug = strtolower(str_replace(' ', '-', $request->name));
        $product->save();


        $tags = explode(',', $request->tags);
        foreach ($tags as $tag) {
            $productTag = new EcommerceTags();
            $productTag->tag_name = trim($tag);
            $productTag->product_id = $product->id;
            $productTag->save();
        }

        $notify[] = ['success', 'Product created successfully.'];
        return redirect()->route('admin.ecommerce.product.index')->withNotify($notify);
    }




    public function Edit($id)
    {
        $categories = EcommerceCategory::latest()->get();
        $product = EcommerceProducts::with('tags')->findOrFail($id);
        $path = imagePath()['ecommerce_product_thumbnail']['path'];
        $size = imagePath()['ecommerce_product_thumbnail']['size'];
        return view('extensions.admin.ecommerce.products.edit', compact('categories', 'product', 'path', 'size'));
    }




    public function Update(Request $request, $id)
    {
        $path = imagePath()['ecommerce_product_thumbnail']['path'];
        $size = imagePath()['ecommerce_product_thumbnail']['size'];

        $request->validate([
            'category_id' => 'required',
            'name' => 'required|max:255',
            'price' => 'required|numeric',
            'discount' => 'nullable|numeric',
            'description' => 'required',
            'hot' => 'nullable|boolean',
            'featured' => 'nullable|boolean',
            'thumbnail' => 'nullable|image',
            'tags' => 'nullable',
        ]);

        $filename = null;

        if (isset($request->thumbnail)) {
            try {
                $filename = uploadImg($request->thumbnail, $path, $size);
            } catch (\Exception $exp) {
                $notify[] = ['error', 'Image could not be uploaded.'];
                return back()->withNotify($notify);
            }
        }

        $updateData = [
            'category_id' => $request->category_id,
            'name' => $request->name,
            'slug' =>  strtolower(str_replace(' ', '-', $request->name)),
            'price' => $request->price,
            'discount' => $request->discount,
            'description' => $request->description,
            'hot' => $request->hot,
            'featured' => $request->featured,
            'status' => 1,
        ];

        if ($filename !== null) {
            $updateData['thumbnail'] = $filename;
        }

        EcommerceProducts::findOrFail($id)->update($updateData);

        $product = EcommerceProducts::findOrFail($id);
        $product->tags()->delete();

        $tags = explode(',', $request->tags);
        foreach ($tags as $tag) {
            $productTag = new EcommerceTags();
            $productTag->tag_name = trim($tag);
            $productTag->product_id = $product->id;
            $productTag->save();
        }

        return redirect()->route('admin.ecommerce.product.index')->with(['success', 'Product Updated Successfully']);
    }

    public function license($id)
    {
        $product = EcommerceProducts::findOrFail($id);
        $page_title = $product->name . ' Licenses';
        return view('extensions.admin.ecommerce.products.license', compact('product', 'page_title'));
    }

    public function storeLicense(Request $request)
    {

        $validate = Validator::make($request->all(), [
            'license' => 'required|string',
        ]);
        if ($validate->fails()) {
            foreach (json_decode($validate->errors()) as $key => $error) {
                $notify[] = ['warning', $error[0]];
            }
            return response()->json(
                [
                    'success' => true,
                    'type' => $notify[0][0],
                    'message' => $notify[0][1]
                ]
            );
        }
        $license = new EcommerceLicense([
            'product_id' => $request->id,
            'license' => $request->input('license'),
            'status' => 0,
        ]);
        $license->save();

        $notify[] = ['success', 'License added to the product successfully!'];
        return response()->json(
            [
                'success' => true,
                'type' => $notify[0][0],
                'message' => $notify[0][1]
            ]
        );
    }

    public function updateLicense(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'license' => 'required|string',
        ]);
        if ($validate->fails()) {
            foreach (json_decode($validate->errors()) as $key => $error) {
                $notify[] = ['warning', $error[0]];
            }
            return response()->json(
                [
                    'success' => true,
                    'type' => $notify[0][0],
                    'message' => $notify[0][1]
                ]
            );
        }
        EcommerceLicense::findOrFail($request->id)->update([
            'license' => $request->license,
        ]);

        $notify[] = ['success', 'License updated successfully!'];
        return response()->json(
            [
                'success' => true,
                'type' => $notify[0][0],
                'message' => $notify[0][1]
            ]
        );
    }




    public function Delete($id)
    {
        $product = EcommerceProducts::findOrFail($id);
        unlink($product->thumbnail);
        EcommerceProducts::findOrFail($id)->delete();


        $notify[] = ['success', 'Product Deleted Successfully'];
        return back()->with($notify);
    }
}
