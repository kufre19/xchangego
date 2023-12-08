<?php

namespace App\Models\Eco;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CacheKeyTrait;

use Illuminate\Support\Facades\Cache;

class EcoLog extends Model
{
    use HasFactory;
    use CacheKeyTrait;


    public function getCache()
    {
        return Cache::remember($this->cacheKey($this) . ':eco_log', now()->addHours(4), function () {
            return self::get();
        });
    }

    public function clearCache()
    {
        Cache::forget($this->cacheKey($this) . ':eco_log');
        return self::getCache();
    }

    public function wallet()
    {
        return $this->belongsTo(EcoWallet::class, 'wallet_id', 'id')->select(['id', 'chain', 'symbol', 'postfix', 'balance', 'address', 'currency']);
    }

    public function wallet_admin()
    {
        return $this->belongsTo(EcoWallet::class, 'wallet_id', 'id');
    }

    public function getChainAttribute()
    {
        return $this->wallet->chain;
    }

    public function getCurrencyAttribute()
    {
        return $this->wallet->currency;
    }

    public function getUserAttribute()
    {
        return $this->wallet->user;
    }

    protected $fillable = [
        'wallet_id',
        'amount',
        'fee',
        'ref_id',
        'txid',
        'type',
        'status',
    ];
}
