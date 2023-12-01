<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cron extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'title',
        'route',
        'description',
        'time',
        'last_run',
        'extension_id'
    ];

    public function extension()
    {
        return $this->belongsTo(Extension::class, 'extension_id', 'id');
    }
}
