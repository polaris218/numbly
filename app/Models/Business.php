<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class Business extends Model
{
    protected $fillable = [
        'name',
        'api_enum',
        'igid',
    ];

    public static function store(Collection $collection)
    {
        foreach ($collection as $array) {
            $array = $array->values();
            $business = new Business();

            $business->name = $array[0];
            $business->api_enum = $array[1];
            $business->igid = $array[2];

            $business->save();
        }
    }

    public function interests()
    {
        return $this->hasOne('App\Models\Interest', 'business');
    }


}
