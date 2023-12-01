<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CacheKeyTrait;

use Illuminate\Support\Facades\Cache;

class ThirdpartyTransactions extends Model
{
    use HasFactory;
    use CacheKeyTrait;

    protected $fillable = [
        'user_id',
        'symbol',
        'chain',
        'memo',
        'chain',
        'sending_address',
        'recieving_address',
        'amount',
        'fee',
        'address',
        'trx_id',
        'type',
        'status',
        'created_at',
        'updated_at',
    ];

    public function getCache()
    {
        return Cache::remember($this->cacheKey($this) . ':thirdparty_transactions', now()->addHours(4), function () {
            return self::get();
        });
    }

    public function clearCache()
    {
        Cache::forget($this->cacheKey($this) . ':thirdparty_transactions');
        return self::getCache();
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
