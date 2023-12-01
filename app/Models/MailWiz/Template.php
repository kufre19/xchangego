<?php

namespace App\Models\MailWiz;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    use HasFactory;

    protected $table = 'mailwiz_templates';

    protected $guarded = ['id'];
}
