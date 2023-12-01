<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CacheKeyTrait;

use Illuminate\Support\Facades\Cache;

class AdminNotification extends Model
{
    use HasFactory;
    use CacheKeyTrait;


    public function getCache()
    {
        return Cache::remember($this->cacheKey($this) . ':admin_notifications', now()->addHours(4), function () {
            return self::get();
        });
    }

    public function getCacheUnread($no)
    {
        return Cache::remember($this->cacheKey($this) . ':admin_notifications_unread', now()->addHours(4), function () use ($no) {
            if ($no != null) {
                return self::where('read_status', 0)->with('user')->orderBy('id', 'desc')->limit($no)->get();
            } else {
                return self::where('read_status', 0)->with('user')->orderBy('id', 'desc')->get();
            }
        });
    }

    public function clearCache()
    {
        Cache::forget($this->cacheKey($this) . ':admin_notifications');
        Cache::forget($this->cacheKey($this) . ':admin_notifications_unread');
        Cache::forget($this->cacheKey($this) . ':admin_notifications_unread_count');
        return self::getCache();
    }

    public function countUnread()
    {
        return Cache::remember($this->cacheKey($this) . ':admin_notifications_unread_count', now()->addHours(4), function () {
            return self::where('read_status', 0)->count();
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
