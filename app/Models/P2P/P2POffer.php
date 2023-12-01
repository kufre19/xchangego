<?php

namespace App\Models\P2P;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class P2POffer extends Model
{
    use HasFactory;

    protected $table = 'p2p_offers';

    protected $fillable = [
        'user_id',
        'payment_method_id',
        'currency',
        'price',
        'min',
        'max',
        'available',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id')->select(['id', 'name', 'email', 'phone', 'country', 'country_code', 'city', 'address', 'zip', 'profile_photo_path', 'username']);
    }

    public function method()
    {
        return $this->belongsTo(P2PPaymentMethod::class, 'payment_method_id', 'id');
    }

    public function orders()
    {
        return $this->hasMany(P2POrder::class, 'offer_id', 'id');
    }

    public function openOrders()
    {
        return $this->hasMany(P2POrder::class, 'offer_id', 'id')
            ->whereNotIn('status', ['completed', 'cancelled']);
    }

    public function completedOrders()
    {
        return $this->hasMany(P2POrder::class, 'offer_id', 'id')
            ->where('status', 'completed');
    }

    public function cancelledOrders()
    {
        return $this->hasMany(P2POrder::class, 'offer_id', 'id')
            ->where('status', 'cancelled');
    }

    public function paidOrders()
    {
        return $this->hasMany(P2POrder::class, 'offer_id', 'id')
            ->where('status', 'paid');
    }

    public function closedOrders()
    {
        return $this->hasMany(P2POrder::class, 'offer_id', 'id')
            ->whereIn('status', ['completed', 'cancelled']);
    }
}
