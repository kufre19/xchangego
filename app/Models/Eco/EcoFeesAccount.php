<?php

namespace App\Models\Eco;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CacheKeyTrait;

use Illuminate\Support\Facades\Cache;

class EcoFeesAccount extends Model
{
    use HasFactory;
    use CacheKeyTrait;

    protected $fillable = [
        'chain',
        'network',
        'symbol',
        'postfix',
        'account_id',
        'customer_id',
    ];

    public function getCache()
    {
        return Cache::remember($this->cacheKey($this) . ':eco_fees_account', now()->addHours(4), function () {
            return self::get();
        });
    }

    public function clearCache()
    {
        Cache::forget($this->cacheKey($this) . ':eco_fees_account');
        return self::getCache();
    }

    public function wallets()
    {
        return $this->hasMany(EcoWallet::class, 'chain', 'chain')->where('currency', $this->symbol);
    }
}
