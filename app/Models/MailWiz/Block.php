<?php

namespace App\Models\MailWiz;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Block extends Model
{
    use HasFactory;

    protected $table = 'mailwiz_blocks';

    protected $guarded = ['id'];
}
