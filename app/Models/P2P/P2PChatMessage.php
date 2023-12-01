<?php

namespace App\Models\P2P;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CacheKeyTrait;
use Illuminate\Support\Facades\Cache;

class P2PChatMessage extends Model
{
    use HasFactory;
    use CacheKeyTrait;

    protected $table = 'p2p_chat_messages';

    protected $fillable = [
        'order_id',
        'messages',
    ];

    protected $casts = [
        'messages' => 'array'
    ];

    public function getCache($id)
    {
        return Cache::remember($this->cacheKey($this) . ':chat-' . $id, now()->addHours(4), function () use ($id) {
            return self::where('order_id', $id)->first();
        });
    }

    public function clearCache($id)
    {
        Cache::forget($this->cacheKey($this) . ':chat-' . $id);
        return self::getCache($id);
    }

    public function order()
    {
        return $this->belongsTo(P2POrder::class, 'order_id', 'id');
    }
}
