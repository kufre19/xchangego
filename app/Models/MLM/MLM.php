<?php

namespace App\Models\MLM;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CacheKeyTrait;

use Illuminate\Support\Facades\Cache;

class MLM extends Model
{
    use HasFactory;
    use CacheKeyTrait;


    public function getCache()
    {
        return Cache::remember($this->cacheKey($this) . ':all_mlm', now()->addHours(4), function () {
            return self::get();
        });
    }

    public function clearCache()
    {
        Cache::forget($this->cacheKey($this) . ':all_mlm');
        Cache::forget($this->cacheKey($this) . ':binary_tree');
        return self::getCache();
    }
    protected $table = 'mlm';

    public function plan()
    {
        return $this->belongsTo(MLMPlan::class, 'rank', 'rank');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'username', 'username');
    }

    public function getH($username)
    {
        return Cache::remember($this->cacheKey($this) . ':mlm_record' . $username, now()->addHours(1), function () use ($username) {
            return $this->where('username', $username)->first();
        });
    }

    public function binary_downlines()
    {
        return Cache::remember($this->cacheKey($this) . ':binary_tree', now()->addHours(4), function () {
            $mlm = $this->first();
            return $this->prepareBinaryTreeData($mlm);
        });
    }


    public function prepareBinaryTreeData($node)
    {
        if ($node === null) {
            return null;
        }

        $user = User::where('username', $node->username)->first();

        if ($user) {
            $treeData = [
                'username' => $user->username ?: '',
                'joinedAt' => $user->created_at ?: '',
                'isActive' => $user->membership === 1,
                'profilePhotoPath' => $user->profile_photo_path ?: 'default.png',
                'rank' => $user->mlm->rank,
                'children' => [],
            ];

            if ($node->L) {
                $leftChild = $this->prepareBinaryTreeData($this->getH($node->L));
                if ($leftChild) { // Add this line
                    $treeData['children'][] = $leftChild;
                }
            }

            if ($node->R) {
                $rightChild = $this->prepareBinaryTreeData($this->getH($node->R));
                if ($rightChild) { // Add this line
                    $treeData['children'][] = $rightChild;
                }
            }

            return $treeData;
        }
    }
}
