<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function socialAccount()
    {
        return $this->hasOne('App\Models\SocialAccount', 'user_id');
    }


    public function files()
    {
        return $this->morphToMany('App\Models\File', 'model', 'model_has_files');
    }


    public function igAccount()
    {
        return $this->hasOne('App\Models\InstagramAccount', 'user_id');
    }

    public function posts()
    {
        return $this->hasMany('App\Models\Post', 'user_id')->orderByDesc('id');
    }

    public function adaccount()
    {
        return $this->hasOne('App\Models\Adaccount', 'user_id');
    }

    public function adposts()
    {
        return $this->hasMany('App\Models\Adpost', 'user_id')->orderByDesc('id');
    }

    public function location()
    {
        return $this->hasOne('App\Models\Location', 'user_id');
    }


}
