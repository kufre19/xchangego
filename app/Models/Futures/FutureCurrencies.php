<?php

namespace App\Models\Futures;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FutureCurrencies extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
}
