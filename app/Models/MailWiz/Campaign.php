<?php

namespace App\Models\MailWiz;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    use HasFactory;

    const STATUS_PENDING = 'pending';
    const STATUS_ACTIVE = 'active';
    const STATUS_PAUSED = 'paused';
    const STATUS_COMPLETED = 'completed';
    const STATUS_STOPPED = 'stopped';

    protected $table = 'mailwiz_campaigns';

    // protected $casts = ['design' => 'json'];

    protected $guarded = ['id'];

    protected $attributes = [
        'progress' => 0,
    ];

    public function getStatusLabel()
    {
        $statusLabels = [
            self::STATUS_PENDING => 'Pending',
            self::STATUS_ACTIVE => 'Active',
            self::STATUS_PAUSED => 'Paused',
            self::STATUS_COMPLETED => 'Completed',
            self::STATUS_STOPPED => 'Stopped',
        ];

        return $statusLabels[$this->status] ?? 'Unknown';
    }

    public function template()
    {
        return $this->belongsTo(Template::class, 'template_id');
    }
}
