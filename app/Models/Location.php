<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable =
        [
            'city',
            'country',
            'latitude',
            'longitude',
            'state',
            'street',
            'zip'
        ];
}
