<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\CacheKeyTrait;

use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    use CacheKeyTrait;
    

    public function getCache()
    {
        return Cache::remember($this->cacheKey($this) . ':settings', now()->addHours(4), function () {
            return self::get();
        });
    }

    public function clearCache()
    {
        Cache::forget($this->cacheKey($this) . ':settings');
        return self::getCache();
    }
    protected $table = 'settings';

    //declare settings key
    const SITE_NAME = "site_name",
        SITE_EMAIL = "site_email";

    protected $fillable = ['field', 'value'];

    public static function getValue($name, $add = false)
    {
        $result = Cache::remember('nioapps_settings', 30, function () use ($name) {
            return self::all()->pluck('value', 'field');
        });

        if (isset($result[$name])) {
            return $result[$name];
        } else {
            if ($add == true) {
                self::create([$name => 'null']);
            }
            return "";
        }
    }

    public static function has($boolean = false)
    {
        $has = self::where('field', 'LIKE', 'nio_l%')
            ->orWhere('field', 'LIKE', '%lite_cre%')
            ->count();
        if ($boolean) return $has > 1;
        return $has > 1 ? str_random(4) : "xvyi";
    }

    public static function updateValue($field, $value)
    {
        $setting = self::where('field', $field)->first();
        if ($setting == null) {
            $setting = new self();
            $setting->field = $field;
        }
        $setting->value = $value;
        if ($setting->save()) {
            Cache::forget('nioapps_settings');
            return $setting->only(['field', 'value']);
        } else {
            return false;
        }
    }
}
