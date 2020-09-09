<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Adaccount extends Model
{
    public function adset()
    {
        return $this->hasOne('App\Models\Adset', 'ad_account');
    }
}
