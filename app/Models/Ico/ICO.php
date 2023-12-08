<?php

namespace App\Models\Ico;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CacheKeyTrait;

use Illuminate\Support\Facades\Cache;

class ICO extends Model
{
    use HasFactory;
    use CacheKeyTrait;

    protected $fillable = [
        'name',
        'symbol',
        'type',
        'stage',
        'status',
        'liquidity',
        'liquidity_supply',
        'lockup',
        'address',
        'presale_address',
        'decimals',
        'network_symbol',
        'chain',
        'total_supply',
        'presale_supply',
        'initial_cap',
        'owner_max',
        'client_min',
        'client_max',
        'owner_recieved',
        'rate',
        'contributors',
        'desc',
        'soft_price',
        'soft_cap',
        'soft_raised',
        'soft_start',
        'soft_end',
        'hard_price',
        'hard_cap',
        'hard_raised',
        'hard_start',
        'hard_end',
        'icon'
    ];

    protected $table = 'icos';

    public function getCache()
    {
        return Cache::remember($this->cacheKey($this) . ':all_ico', now()->addHours(4), function () {
            return self::get();
        });
    }

    public function clearCache()
    {
        Cache::forget($this->cacheKey($this) . ':all_ico');
        return self::getCache();
    }

    public function getIcoCache()
    {
        return Cache::remember($this->cacheKey($this) . ':icos', now()->addHours(4), function () {
            return self::with(['logs'])->get();
        });
    }

    public function logs()
    {
        return $this->hasMany(IcoLogs::class);
    }
}
