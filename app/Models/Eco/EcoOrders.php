<?php

namespace App\Models\Eco;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CacheKeyTrait;

use Illuminate\Support\Facades\Cache;

class EcoOrders extends Model
{
    use HasFactory;
    use CacheKeyTrait;
    

    public function getCache()
    {
        return Cache::remember($this->cacheKey($this) . ':eco_orders', now()->addHours(4), function () {
            return self::get();
        });
    }

    public function clearCache()
    {
        Cache::forget($this->cacheKey($this) . ':eco_orders');
        return self::getCache();
    }
}
