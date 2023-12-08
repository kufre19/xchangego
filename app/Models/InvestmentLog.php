<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvestmentLog extends Model
{
    use HasFactory;

    protected $table = "investments_log";
    protected $fillable = [
        'user_id',
        'wallet_id',
        'investment_plan_id',
        'amount',
        'profit',
        'end_date',
        'trx',
        'status',
        'last_profit_calculation',
    ];

    protected $dates = [
        'end_date',
        'last_profit_calculation',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function plan()
    {
        return $this->belongsTo(InvestmentPlans::class, 'investment_plan_id', 'id');
    }

    public function wallet()
    {
        return $this->belongsTo(Wallet::class, 'wallet_id', 'id');
    }

    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 2);
    }

    public function scopeCancelled($query)
    {
        return $query->where('status', 3);
    }

    public function calculateDailyProfit()
    {
        $now = Carbon::now();
        $created_at = Carbon::parse($this->created_at);
        $last_calculation_date = $this->last_profit_calculation ? Carbon::parse($this->last_profit_calculation) : $this->created_at;

        // Calculate the number of days since the investment started
        $days_since_investment = $now->diffInDays($created_at);

        // Check if at least one day has passed since the investment started
        if ($days_since_investment >= 1) {
            // Calculate the start and end of the current day's profit calculation range
            $range_start = $created_at->copy()->addDays($days_since_investment)->startOfDay()->addHours($created_at->hour)->addMinutes($created_at->minute)->addSeconds($created_at->second);
            $range_end = $range_start->copy()->addDay();

            // Check if the current time is within the range of the current day's profit calculation
            if ($now->between($range_start, $range_end)) {
                $daily_profit = $this->amount * ($this->plan->interest_rate / 100);
                return $daily_profit;
            }
        }

        return 0;
    }
}
