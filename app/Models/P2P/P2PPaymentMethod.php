<?php

namespace App\Models\P2P;

use App\Models\Currencies;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class P2PPaymentMethod extends Model
{
    use HasFactory;

    protected $table = 'p2p_payment_methods';

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'status',
        'fiat',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function orders()
    {
        return $this->hasMany(P2POrder::class, 'payment_method_id', 'id');
    }

    public function currency()
    {
        return $this->belongsTo(Currencies::class, 'code', 'fiat');
    }
}
