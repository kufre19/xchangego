<?php

namespace App\Models\Ecommerce;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EcommerceLicense extends Model
{
    use HasFactory;
    protected $table = 'ecommerce_licenses';
    protected $guarded = [];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function product()
    {
        return $this->belongsTo(EcommerceProducts::class, 'product_id', 'id');
    }

    protected $fillable = [
        'user_id',
        'product_id',
        'license',
        'activation',
        "activated_at",
        'trx',
        'status'
    ];
}
