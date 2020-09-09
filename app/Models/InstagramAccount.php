<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InstagramAccount extends Model
{
    protected $table = 'instagram_accounts';

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function hashtags()
    {
        return $this->belongsToMany(Hashtag::class, 'user_has_hashtag', 'ig_user_id');
    }

    public function businesses()
    {
        return $this->belongsToMany(Business::class, 'user_has_businesses', 'ig_user_id');
    }

}
