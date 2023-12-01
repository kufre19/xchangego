<?php

namespace App\Http\Controllers\Admin\Extensions\Ecommerce;

use App\Http\Controllers\Controller;
use App\Models\Ecommerce\EcommerceWishlist;
use App\Models\Ecommerce\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{

    public function add(Request $request)
    {
        $user = Auth::user();
        $wishlist = new EcommerceWishlist();
        $wishlist->user_id = $user->id;
        $wishlist->product_id = $request->id;
        $wishlist->save();

        return response()->json([
            'type' => 'success',
            'message' => 'Product added to wishlist successfully'
        ]);
    }
    public function remove(Request $request)
    {
        $user = Auth::user();
        EcommerceWishlist::where('user_id', $user->id)->where('product_id', $request->id)->first()->delete();

        return response()->json([
            'type' => 'warning',
            'message' => 'Product removed from wishlist successfully'
        ]);
    }


    public function GetWishlistProduct()
    {

        $wishlist = EcommerceWishlist::with('product')->where('user_id', Auth::id())->latest()->get();
        return response()->json($wishlist);
    }


    public function RemoveWishlistProduct($id)
    {

        EcommerceWishlist::where('user_id', Auth::id())->where('id', $id)->delete();
        return response()->json(['success' => 'Successfully Product Remove']);
    }
}
