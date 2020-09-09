<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserProfile extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        $this->status ? $ready = true : false;
        $genders = [
            '0' => 'Both',
            '1' => 'Male',
            '2' => 'Female',
        ];
        $business = $this->igAccount->businesses->first();
        $interests = $business->interests ? $business->interests : null;
        $location = $this->location;
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'avatar' => $this->avatar,
            'ig' => $this->ig,
            'hashtags' => $this->hashtags,
            'business' => [
                [
                    "id" => $business->id,
                    "name" => $business->name,
                    "igid" => $business->igid,
                    "api_enum" => $business->api_enum,

                    'interests' => [
                        [
                            'name' => $interests->name ?? null,
                            'id' => $interests->id ?? null,
                        ],
                    ],

                    'gender' =>  isset($interests->gender) ? $genders[(int)$interests->gender] : $genders[0],
                    'min_age' => $interests->min_age ?? 18,
                    'max_age' => $interests->max_age ?? 65,
                    'location' => $location->street." ".$location->city.", ".$location->state." ".$location->zip." ".$location->country,
                    //'bid_amount' =>  $this->adset_pref->bid_amount,
                    'budget' => round($this->adset_pref->daily_budget/100, 2),
                    ],
            ],

            'ready' => $ready,

        ];

        return $data;
    }
}
