<?php

namespace App\Services;

use App\Models\{
    Adaccount, Adset, Business, File, InstagramAccount, Location, SocialAccount, User
};
use File as FileFacade;
use Laravel\Socialite\Contracts\User as ProviderUser;
use Laravel\Socialite\Facades\Socialite;

/**
 * Class UserService
 * @package App\Services
 */
class UserService
{
    /**
     *
     */
    const STORAGE_DISK = 'public';
    /**
     *
     */
    const STORAGE_DIR = 'avatars/';
    /**
     *
     */
    const FILE_EXT = '.jpg';

    /**
     * @var string
     */
    public $provider = 'facebook';

    /**
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function getSocialAccount()
    {
        $token = $this->getAccessToken();
        if (isset($token->error)) {

            return response($token->error->message, 422);
        }

        $account = Socialite::driver('facebook')->stateless()->userFromToken(
            $token->access_token
        );

        return $account;
    }

    /**
     * @return mixed
     */
    public function getAccessToken()
    {
        $fbClientId = config('services.facebook.client_id');
        $fbClientSecret = config('services.facebook.client_secret');
        $fbRedirectUrl = config('services.facebook.redirect');

        $code = request()->code;


        $url = "https://graph.facebook.com/v4.0/dialog/oauth/?"
            ."client_id={$fbClientId}"
            ."&redirect_uri={$fbRedirectUrl}"
            ."&client_secret={$fbClientSecret}"
            ."&code={$code}"
            ."&scope=instagram_basic,manage_pages,pages_show_list";

        \Log::debug($url);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $output = curl_exec($ch);
        curl_close($ch);

        \Log::debug($output);

        return json_decode($output);
    }

    /**
     * @param  ProviderUser $providerUser
     * @return bool
     */
    public function createOrGetUser(ProviderUser $providerUser)
    {
        $account = SocialAccount::whereProvider($this->provider)
            ->whereProviderUserId($providerUser->getId())
            ->first();

        if ($account) {
            return $account->user;
        } else {
            $account = new SocialAccount(
                [
                    'provider' => $this->provider,
                ]
            );
            $account->provider_user_id = $providerUser->getId();

            $user = $this->getUserBySocial($providerUser);

            if (!$user) {
                $user = User::create(
                    [
                        'email' => $providerUser->getEmail() ?? null,
                        'name' => $providerUser->getName(),
                        'password' => md5(rand(1, 10000)),
                    ]
                );

                $avatar = $this->getSocialAvatar(
                    $providerUser->getAvatar(),
                    $providerUser->getId()
                );
                $user->files()->attach($avatar->id);
            }
            $account->user()->associate($user);
            $account->save();

            return $user;
        }
    }

    /**
     * @param $providerUser
     * @return bool
     */
    protected function getUserBySocial($providerUser)
    {
        if ($email = $providerUser->getEmail()) {
            $user = User::whereEmail($email)->first();

            return $user;
        }

        $account = SocialAccount::whereProviderUserId($providerUser->getId())
            ->first();

        if ($account) {
            $user = User::find($account->user_id);

            return $user;
        }

        return false;
    }

    /**
     * @param $file
     * @param $userId
     * @return File|bool|null
     */
    protected function getSocialAvatar($file, $userId)
    {
        $fileContents = file_get_contents($file);
        $filename = $userId."_avatar".self::FILE_EXT;
        $dir = storage_path('app/public/'.self::STORAGE_DIR);

        $path = $dir.$filename;

        if (!FileFacade::exists($dir)) {
            FileFacade::makeDirectory($dir, $mode = 0777, true, true);
        }
        FileFacade::put($path, $fileContents);

        $uploadedFile = $this->storeFile($path, $filename);
        if (!$uploadedFile) {
            return null;
        }

        return $uploadedFile;
    }

    /**
     * @param $path
     * @param $filename
     * @return File|bool
     */
    protected function storeFile($path, $filename)
    {
        if (!$path) {
            return false;
        }

        $uploadedFile = new File();
        $uploadedFile->link = $path;
        $uploadedFile->type = self::FILE_EXT;
        $uploadedFile->name = $filename;
        $uploadedFile->save();

        return $uploadedFile;
    }

    /**
     * @param $igId
     * @param $userId
     * @return InstagramAccount
     */
    public function saveIgAccount($igId, $userId, $fb_ig_id, $fb_id)
    {
        $userIgAccount = new InstagramAccount();
        $userIgAccount->igid = $igId;
        $userIgAccount->user_id = $userId;
        $userIgAccount->fb_ig_id = $fb_ig_id;
        $userIgAccount->fb_id = $fb_id;
        $userIgAccount->save();

        return $userIgAccount;
    }

    public function setUserBusinessCategory($categories)
    {
        $array = [];
        foreach ($categories as $category) {
            $data = Business::where('igid', $category->id)->first();
            if ($data) {
                $array [] = $data->id;
            }
        }

        return $array;
    }

    public function setUserLocation($data)
    {

        $data = collect($data);

        if ($data->isNotEmpty()) {
            $data = $data->toArray();
            $location = new Location();
            $location->fill($data);
            $location->user_id = auth()->user()->id;
            $location->save();

            return $location;
        }

        return false;
    }

    public function setUserAdAccount($data)
    {
        if (isset($data->data)) {
            $adaccount = $data->data[0];

            $localAdaccount = new Adaccount();
            $localAdaccount->user_id = auth()->user()->id;
            $localAdaccount->ad_id = $adaccount->account_id;
            $localAdaccount->act_ad_id = $adaccount->id;

            $localAdaccount->save();

        }

        return response(
            [
                'error' => __(
                    'Sorry, we cant found any ad accounts related to your business, please, try again later.'
                ),
            ],
            422
        );

    }

    public function setUserAdset($data)
    {
        if (isset($data)) {
            $user = auth()->user();
            $adset = $data->id;

            $localAdset = new Adset();
            $localAdset->ad_account = $user->adaccount->id;
            $localAdset->adset_id = $adset;

            $localAdset->save();
        }

        return response(
            [
                'error' => __(
                    'Sorry, we cant found any adsets related to your business, please, try again later.'
                ),
            ],
            422
        );
    }
}