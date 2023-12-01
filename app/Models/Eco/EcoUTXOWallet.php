<?php

namespace App\Models\Eco;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EcoUTXOWallet extends Model
{
    use HasFactory;

    protected $table = 'eco_utxo_wallets';

    protected $fillable = [
        'index',
        'chain',
        'symbol',
        'currency',
        'postfix',
        'address',
        'network',
        'status',
        'private_key'
    ];

    public function utxo()
    {
        return $this->hasMany(EcoUTXO::class, 'wallet_id', 'id');
    }
}
