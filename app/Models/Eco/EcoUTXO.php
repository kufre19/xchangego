<?php

namespace App\Models\Eco;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EcoUTXO extends Model
{
    use HasFactory;

    protected $table = 'eco_utxos';

    protected $fillable = [
        'wallet_id',
        'chain',
        'txHash',
        'value',
        'index',
        'status',
        'type'
    ];

    public function wallet()
    {
        return $this->belongsTo(EcoWallet::class, 'wallet_id', 'id');
    }

    public function utxoWallet()
    {
        return $this->belongsTo(EcoUTXOWallet::class, 'wallet_id', 'id');
    }
}
