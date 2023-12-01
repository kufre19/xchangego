<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\CacheKeyTrait;

use Illuminate\Support\Facades\Cache;

class SupportTicket extends Model
{
    protected $guarded = ['id'];
    use CacheKeyTrait;


    public function getCache()
    {
        return Cache::remember($this->cacheKey($this) . ':support_tickets', now()->addHours(4), function () {
            return self::get();
        });
    }

    public function clearCache()
    {
        Cache::forget($this->cacheKey($this) . ':support_tickets');
        return self::getCache();
    }

    public function getCached($id)
    {
        return Cache::remember($this->cacheKey($this) . ':support-chat-' . $id, now()->addHours(4), function () use ($id) {
            return self::with(['user'])->where('id', $id)->first();
        });
    }

    public function clearCached($id)
    {
        Cache::forget($this->cacheKey($this) . ':support-chat-' . $id);
        return self::getCached($id);
    }

    public function getUsernameAttribute()
    {
        return $this->name;
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id')->select('id', 'firstname', 'lastname', 'email', 'username', 'profile_photo_path');
    }

    protected $casts = [
        'messages' => 'array'
    ];
}
