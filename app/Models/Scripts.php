<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CacheKeyTrait;

use Illuminate\Support\Facades\Cache;

class Scripts extends Model
{
    use HasFactory;
    use CacheKeyTrait;

    protected $table = 'scripts';

    protected $fillable = [
        'title',
        'code',
        'status',
    ];

    public function clearCache()
    {
        Cache::forget($this->cacheKey($this) . ':scripts');
        return self::getCache();
    }

    public function getCache()
    {
        return Cache::remember($this->cacheKey($this) . ':scripts', now()->addHours(4), function () {
            return self::where('status', 1)->get();
        });
    }
}
