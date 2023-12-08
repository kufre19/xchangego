<?php

namespace App\Models\MailWiz;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{
    use HasFactory;

    protected $table = 'mailwiz_settings';

    protected $guarded = ['id'];
}
