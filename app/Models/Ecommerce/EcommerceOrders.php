<?php

namespace App\Models\Ecommerce;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EcommerceOrders extends Model
{
    use HasFactory;
    protected $table = 'ecommerce_order';

    protected $fillable = [
        'product_id',
        'user_id',
        'price',
        'trx',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function product()
    {
        return $this->belongsTo(EcommerceProducts::class, 'product_id', 'id');
    }

    public function license()
    {
        return $this->hasOne(EcommerceLicense::class, 'trx', 'trx');
    }
}
