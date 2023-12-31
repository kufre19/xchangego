<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CacheKeyTrait;

use Illuminate\Support\Facades\Cache;

class PopupsStatus extends Model
{
    use HasFactory;
    public $table = 'popups_status';
    use CacheKeyTrait;
    

    public function getCache()
    {
        return Cache::remember($this->cacheKey($this) . ':popup_status', now()->addHours(4), function () {
            return self::get();
        });
    }

    public function clearCache()
    {
        Cache::forget($this->cacheKey($this) . ':popup_status');
        return self::getCache();
    }
}
