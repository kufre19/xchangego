<?php

namespace App\Models\P2P;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class P2PSeller extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'rating',
        'status',
        'min_limit',
        'max_limit',
    ];

    protected $table = 'p2p_sellers';

    protected $appends = [
        'orders_count',
        'offers_count',
        'methods_count',
        'completion_rate',
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id')->select(['id', 'name', 'username', 'firstname', 'lastname', 'country', 'profile_photo_path']);
    }

    public function orders()
    {
        return $this->hasMany(P2POrder::class, 'seller_id');
    }

    public function offers()
    {
        return $this->hasMany(P2POffer::class, 'user_id');
    }

    public function methods()
    {
        return $this->hasMany(P2PPaymentMethod::class, 'user_id');
    }

    public function getOrdersCountAttribute()
    {
        return $this->orders()->count();
    }

    public function getOffersCountAttribute()
    {
        return $this->offers()->count();
    }

    public function getMethodsCountAttribute()
    {
        return $this->methods()->count();
    }

    public function getCompletionRateAttribute()
    {
        $completedOrders = $this->orders()
            ->where('status', 'completed')
            ->count();

        $totalOrders = $this->getOrdersCountAttribute();

        if ($totalOrders == 0) {
            return 0;
        }

        return round(($completedOrders / $totalOrders) * 100, 2);
    }

    public static function chart(string $dates = 'days', int $get = 30, string $type = 'all'): object
    {
        $now = Carbon::now();
        $data = [
            $dates => null,
            'data' => null,
        ];

        switch ($dates) {
            case 'days':
                $lastPeriod = $now->copy()->subDays($get);
                $diff = $now->diffInDays($lastPeriod);
                $format = 'D';
                break;
            case 'months':
                $lastPeriod = $now->copy()->subMonths(12);
                $diff = $now->diffInMonths($lastPeriod);
                $format = 'M';
                break;
            default:
                return (object) $data;
        }

        for ($i = 1; $i <= $diff; $i++) {
            switch ($type) {
                case 'count':
                    $count = self::whereDate('created_at', $lastPeriod->format('Y-m-d'))->count();
                    break;
                case 'total_volume':
                    $completedOrders = P2POrder::where('status', 'completed')
                        ->whereDate('created_at', $lastPeriod->format('Y-m-d'))
                        ->get(['amount', 'fee']);

                    $count = $completedOrders->sum('amount');
                    break;
                case 'total_commissions':
                    $completedOrders = P2POrder::where('status', 'completed')
                        ->whereDate('created_at', $lastPeriod->format('Y-m-d'))
                        ->get(['amount', 'fee']);

                    $count = $completedOrders->sum('amount') - $completedOrders->sum('fee');
                    break;
                case 'total_fees':
                    $completedOrders = P2POrder::where('status', 'completed')
                        ->whereDate('created_at', $lastPeriod->format('Y-m-d'))
                        ->get(['fee']);

                    $count = $completedOrders->sum('fee');
                    break;
                default:
                    $count = self::whereDate('created_at', $lastPeriod->format('Y-m-d'))->count();
                    break;
            }
            $data['data'] .= $count . ",";
            $data[$dates] .= '"' . $lastPeriod->format($format) . '",';

            switch ($dates) {
                case 'days':
                    $lastPeriod->addDay();
                    break;
                case 'months':
                    $lastPeriod->addMonth();
                    break;
                default:
                    break;
            }
        }
        return (object) $data;
    }
}
