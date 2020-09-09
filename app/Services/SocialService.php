<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;


/**
 * Class SocialService
 * @package App\Services
 */
class SocialService
{

    const FB_API_URL = 'https://graph.facebook.com/';
    protected $user;
    protected $token;
    protected $igAccountDescription;

    public function __construct()
    {
        if (Auth::check()) {
            $this->user = \auth()->user();
            $this->token = $this->user->getRememberToken();
            if(isset($this->user->igAccount)) {
                $this->igAccountDescription = $this->getInstagramAccountDescription($this->user->igAccount->igid);
            }
        }
    }

    /**
     * @param $token
     * @return mixed
     */
    public function getPages()
    {
        $url = self::FB_API_URL."v4.0/me/accounts?fields=category_list,instagram_business_account,location&access_token=".$this->token;
        $output = $this->makeCurlRequest($url);

        return $output;
    }

    /**
     * @param $url
     * @return mixed
     */
    public function makeCurlRequest($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $output = curl_exec($ch);
        curl_close($ch);

        return json_decode($output);
    }

    public function getInstagramActorID($page)
    {
        $token = $this->getPageAccessToken($page);
        if (isset($token->access_token)) {
            $url = self::FB_API_URL."v5.0/{$page}?access_token={$token->access_token}&fields=instagram_accounts";
            $output = $this->makeCurlRequest($url);
        }


        return $output;
    }

    public function getPageAccessToken($page)
    {
        $url = self::FB_API_URL."{$page}?access_token={$this->token}&fields=access_token";
        $output = $this->makeCurlRequest($url);

        return $output;
    }

    /**
     * @param $token
     * @param $igId
     * @return mixed
     */
    public function getInstagramAccountDescription($igId)
    {
        $url = self::FB_API_URL."v3.2/{$igId}?fields=biography%2Cusername%2Cwebsite&access_token={$this->token}";
        $output = $this->makeCurlRequest($url);

        return $output;

    }

    /**
     * @param $account
     * @param $token
     * @param $limit
     * @return mixed
     */
    public function getAccountHashtags($account, $limit)
    {
        $url = self::FB_API_URL."v4.0/{$account}/media?fields=like_count,caption&limit={$limit}&access_token={$this->token}";
        $output = $this->makeCurlRequest($url);

        return $output;
    }

    public function getHashTagsID($hashtag, $igID)
    {
        $url = self::FB_API_URL."v4.0/ig_hashtag_search?user_id={$igID}&q={$hashtag}&access_token={$this->token}";
        $output = $this->makeCurlRequest($url);

        return $output;
    }

    /**
     * @param $hastagID
     * @param $igID
     * @param $token
     * @param $cursor
     * @return mixed
     */
    public function getContentByHashtagID($hastagID, $igID, $cursor)
    {
        $pagination = '';

        if ($cursor) {
            $pagination = '&after='.$cursor;
        }

        $url = self::FB_API_URL."v4.0/{$hastagID}/recent_media?user_id={$igID}&fields=id,caption,media_type,media_url&access_token={$this->token}".$pagination;
        $output = $this->makeCurlRequest($url);


        return $output;
    }

    public function createIGMediaContainer($userID, $image, $caption)
    {
        $url = self::FB_API_URL."v4.0/{$userID}/media?image_url={$image}&caption={$caption}&access_token={$this->token}";
        $output = $this->makeCurlRequestPOST($url);

        return $output;
    }

    public function makeCurlRequestPOST($url, $post)
    {

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post);

        $output = curl_exec($ch);
        curl_close($ch);

        return json_decode($output);
    }

    public function getUserAdAccounts()
    {
        $url = self::FB_API_URL."v5.0/me/adaccounts?access_token=".$this->token;
        $output = $this->makeCurlRequest($url);

        return $output;
    }

    public function getFbBusinessCategories()
    {
        $url = self::FB_API_URL."v4.0/fb_page_categories?access_token={$this->token}";
        $data = $this->makeCurlRequest($url);

        $dataToDb = [];
        foreach ($data as $item) {
            $dataToDb [] = $this->checkChildCategories($item);
        }

        return collect($dataToDb)->flatten(0)->chunk(3);
    }

    /*
    public function checkChildCategories($object)
    {
        $array = [];
        $recArray = [];

        foreach ($object as $row) {

            if (isset($row->fb_page_categories)) {
                $recArray = self::checkChildCategories($row->fb_page_categories);
            }

            $array [] = [$row->name, $row->api_enum, $row->id];
            $array [] = $recArray;
        }

        return $array;
    }
    */

    public function createAdSet()
    {
        $adaccount = $this->user->adaccount;
        $location = $this->user->location;
        $business = $this->user->igAccount->businesses->first();
        $interests = $business->interests;

        $url = self::FB_API_URL."v6.0/{$adaccount->act_ad_id}/adsets";
        $campaign = $this->createAdCampaign($adaccount->act_ad_id);
        $targeting = json_encode(
            [
                "age_min" => $interests->min_age,
                "age_max" => $interests->max_age,
                "publisher_platforms" => ["instagram"],

                "geo_locations" => [
                    "custom_locations" => [
                        [
                            "latitude" => "{$location->latitude}",
                            "longitude" => "{$location->longitude}",
                            "radius" => "1",
                            "distance_unit" => "kilometer",
                        ],
                    ],
                ],
                "interests" => [
                    [
                        "id" => $interests->igid,
                        "name" => $interests->name,
                    ],
                ],
            ]
        );
        $date = Carbon::now()->format('d/m/Y');
        $options = [
            'name' => 'Nimbly-'.$this->igAccountDescription->username."-".$interests->name."-".$date,
            'status' => 'PAUSED',
            'optimization_goal' => 'REACH',
            'targeting' => $targeting,
            'campaign_id' => $campaign->id,
            'billing_event' => 'IMPRESSIONS',
            'bid_amount' => 200,
            'daily_budget' => 200,
            'access_token' => $this->token,
        ];


        $data = $this->makeCurlRequestPOST($url, $options);

        return $data;

    }

    public function createAdCampaign($account)
    {

        $business = $this->user->igAccount->businesses->first();
        $interests = $business->interests;
        $url = self::FB_API_URL."v5.0/{$account}/campaigns";

        $options = [
            'name' => 'Nimbly-'.$this->igAccountDescription->username."-".$interests->name,
            'status' => 'PAUSED',
            'special_ad_category' => 'NONE',
            'objective' => 'REACH',
            'access_token' => "{$this->token}",
        ];

        $data = $this->makeCurlRequestPOST($url, $options);

        return $data;

    }


    public function getBudget($adset)
    {
        $url = self::FB_API_URL."v5.0/{$adset}?fields=name,targeting,bid_amount,daily_budget&access_token=".$this->token;
        $data = $this->makeCurlRequest($url);

        return $data;
    }

    public function getImageHash($imagePath, $account)
    {
        $url = self::FB_API_URL."v5.0/{$account->act_ad_id}/adimages";

        $file = $imagePath;
        $mime = mime_content_type($file);
        $info = pathinfo($file);
        $name = $info['basename'];

        $output = new \CURLFile($file, $mime, $name);
        $options = [
            'filename' => $output,
            'access_token' => $this->token,
        ];
        $data = $this->makeCurlRequestPOST($url, $options);

        return $data;

    }

    public function createAdCreative($content, $account, $hash, $fbIgId, $pageId)
    {
        $author = $this->igAccountDescription->username;
        $url = self::FB_API_URL."v6.0/{$account}/adcreatives";
        $objects = json_encode(
            [
                "page_id" => $pageId,
                "link_data" => [
                    "image_crops" => [
                         "100x100" => [
                            [
                                200,
                                90
                            ],
                            [
                                900,
                                790
                            ]
                        ]

                    ],
                    "image_hash" => $hash,
                    "message" => $content,
                    "link" => 'https://www.instagram.com/'.$author
                ],
            ]
        );
        $options = [
            'name' => 'NimblyAdCreative',
            'body' =>  $content,
            'ad_format' => 'INSTAGRAM_STANDARD',
            "instagram_actor_id" => $fbIgId,
            "object_story_spec" => $objects,
            'access_token' => "{$this->token}",
        ];

        $data = $this->makeCurlRequestPOST($url, $options);

        return $data;

    }

    public function createAd($name,$account, $adset, $creativeId)
    {
        $url = self::FB_API_URL."v5.0/{$account}/ads";

        $options = [
            'name' => $name,
            'adset_id' => $adset,
            'creative' => json_encode(
                [
                    'creative_id' => $creativeId,
                ]
            ),
            'status' => 'PAUSED',
            'access_token' => "{$this->token}",

        ];


        $data = $this->makeCurlRequestPOST($url, $options);

        return $data;
    }


}