<?php

namespace App\Models\Eco;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EcoWithdraw extends Model
{
    use HasFactory;

    protected $table = 'eco_withdraws';

    protected $fillable = [
        'user_id',
        'account_id',
        'wallet_id',
        'symbol',
        'chain',
        'address',
        'to',
        'amount',
        'fee',
        'status',
        'tx_id',
        'withdraw_id',
    ];

    protected $casts = [
        'amount' => 'decimal:8',
        'fee' => 'decimal:8',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function wallet()
    {
        return $this->belongsTo(EcoWallet::class, 'wallet_id');
    }
}
