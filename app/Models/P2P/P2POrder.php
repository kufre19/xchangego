<?php

namespace App\Models\P2P;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class P2POrder extends Model
{
    use HasFactory;

    const STATUS_OPEN = 'open';
    const STATUS_PAID = 'paid';
    const STATUS_COMPLETED = 'completed';
    const STATUS_CANCELLED = 'cancelled';

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'p2p_orders';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'offer_id',
        'buyer_id',
        'seller_id',
        'price',
        'amount',
        'currency',
        'fiat',
        'fee',
        'status',
        'trx',
        'payment_method_id',
        'review',
        'note',
        'moderation_note',
        'moderation_status',
        'moderation_by',
        'moderation_by'
    ];


    public function method()
    {
        return $this->belongsTo(P2PPaymentMethod::class, 'payment_method_id', 'id');
    }

    public function offer()
    {
        return $this->belongsTo(P2POffer::class, 'offer_id', 'id');
    }

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id', 'id')->select(['id', 'name', 'firstname', 'lastname', 'username', 'profile_photo_path', 'country']);
    }

    public function seller()
    {
        return $this->belongsTo(P2PSeller::class, 'seller_id', 'user_id');
    }

    public function messages()
    {
        return $this->hasMany(P2PChatMessage::class, 'order_id', 'id');
    }

    public function scopeClosed($query)
    {
        return $query->whereIn('status', ['completed', 'cancelled']);
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeOpen($query)
    {
        return $query->whereIn('status', ['open', 'paid']);
    }

    public function scopeOrders($query)
    {
        return $query->whereIn('status', ['open', 'paid', 'completed']);
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
                case 'all':
                    $count = self::whereDate('created_at', $lastPeriod->format('Y-m-d'))->count();
                    break;
                case 'completed':
                    $count = self::where('status', 'completed')
                        ->whereDate('created_at', $lastPeriod->format('Y-m-d'))
                        ->count();
                    break;
                case 'cancelled':
                    $count = self::where('status', 'cancelled')
                        ->whereDate('created_at', $lastPeriod->format('Y-m-d'))
                        ->count();
                    break;
                case 'open':
                    $count = self::where('status', 'open')
                        ->whereDate('created_at', $lastPeriod->format('Y-m-d'))
                        ->count();
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
