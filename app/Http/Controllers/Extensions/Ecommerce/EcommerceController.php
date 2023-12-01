<?php

namespace App\Http\Controllers\Extensions\Ecommerce;

use App\Http\Controllers\Controller;
use App\Models\Ecommerce\EcommerceCategory;
use App\Models\Ecommerce\EcommerceLicense;
use App\Models\Ecommerce\EcommerceOrders;
use App\Models\Ecommerce\EcommerceProducts;
use App\Models\Ecommerce\EcommerceTags;
use App\Models\Ecommerce\EcommerceWishlist;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EcommerceController extends Controller
{

    public function index()
    {
        $user = Auth::user();

        $wishlist_product_ids = EcommerceWishlist::where('user_id', $user->id)->pluck('product_id')->toArray();

        return response()->json([
            'wallet' => getWallet($user->id, 'funding', 'USDT', 'funding'),
            'categories' => EcommerceCategory::where('status', 1)->get(),
            'tags' => EcommerceTags::distinct()->pluck('tag_name')->toArray(),
            'hot_deals' => EcommerceProducts::where('status', 1)->where('hot', 1)->get(),
            'products' => EcommerceProducts::with('category')->where('status', 1)->get()->map(function ($product) use ($wishlist_product_ids) {
                $product->in_wishlist = in_array($product->id, $wishlist_product_ids);
                $product->tags = EcommerceTags::where('product_id', $product->id)->distinct()->pluck('tag_name')->toArray();
                return $product;
            }),


        ]);
    }

    public function getUserOrders()
    {
        return response()->json(EcommerceOrders::with('product', 'license')->where('user_id', auth()->user()->id)->get(), 200);
    }



    public function transaction($wallet, $amount, $side, $details, $trx)
    {
        $transaction = new Transaction();
        $transaction->user_id = $wallet->user_id;
        $transaction->amount = $amount;
        $transaction->currency = $wallet->symbol;
        $transaction->post_balance = $wallet->balance;
        $transaction->trx_type = $side;
        $transaction->details = $details;
        $transaction->trx = $trx;
        $transaction->save();
    }

    public function activateOrder(Request $request)
    {
        $user = Auth::user();
        $license = EcommerceLicense::where('trx', $request->trx)->first();
        if (!$license) {
            return response()->json([
                'type' => 'error',
                'message' => 'Sorry! License not available for this product, please contact with support',
            ]);
        }
        if ($license->user_id != $user->id) {
            return response()->json([
                'type' => 'error',
                'message' => 'Sorry! You are not authorized to activate this license',
            ]);
        }
        $license->activation = 1;
        $license->activated_at = now();
        $license->save();

        return response()->json([
            'type' => 'success',
            'message' => 'License activated successfully',
        ]);
    }

    public function purchase(Request $request)
    {
        $user = Auth::user();
        $wallet = getWallet($user->id, 'funding', 'USDT', 'funding');

        $product = EcommerceProducts::findOrFail($request->id);
        $price = $product->price - $product->discount;

        if ($price > $wallet->balance) {
            return response()->json([
                'type' => 'error',
                'message' => 'Your Account Balance ' . getAmount($wallet->balance) . ' ' . $wallet->symbol . ' Not Enough! Please Deposit First',
            ]);
        }

        $license = EcommerceLicense::where('product_id', $product->id)->whereNull('user_id')->where('status', 0)->first();
        if (!$license) {
            createAdminNotification(auth()->id(), "No available licenses for purchase. Product ID: {$product->id}", route('admin.ecommerce.product.license', $product->id));
            return response()->json([
                'type' => 'error',
                'message' => 'Sorry! No license available for this product',
            ]);
        }

        $license->user_id = $user->id;
        $license->status = 1;
        $license->trx = getTrx();
        $license->save();

        $order = new EcommerceOrders();
        $order->product_id = $product->id;
        $order->user_id = $user->id;
        $order->price = $price;
        $order->trx =  $license->trx;
        $order->save();


        $details = 'Product: ' . $product->name . ', Price: ' . getAmount($price) . ' ' . $wallet->symbol . ' purchased successfully';
        $this->transaction($wallet, $order->price, '-', $details, $license->trx);

        $wallet->balance -= $price;
        $wallet->save();

        notify($user, 'PRODUCT_PURCHASE_SUCCESS', [
            "product_name" => $product->name,
            "category_name" => $product->category->name,
            "product_id" => $product->id,
            "amount" => $price,
            "currency" => $wallet->symbol,
            "discount" => $product->discount,
            "trx" => $license->trx,
            "post_balance" => $wallet->balance
        ]);


        createAdminNotification($user->id, "Product purchased successfully. Product ID: {$product->id}", route('admin.ecommerce.orders.index'));

        return response()->json([
            'type' => 'success',
            'message' => 'Purchase completed successfully',
        ]);
    }
}
