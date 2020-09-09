<?php /** @noinspection ALL */

namespace App\Http\Controllers;

use App\Http\Resources\UserProfile;
use App\Models\{
    Adaccount, User
};
use App\Services\{
    HashtagService, SocialService, UserService
};
use Illuminate\Support\Facades\Storage;


/**
 * Class UserController
 * @package App\Http\Controllers
 */
class UserController extends Controller
{
    /**
     * @var SocialService
     */
    private $socialService;
    /**
     * @var HashtagService
     */
    private $hashtagService;

    /**
     * @var UserService
     */
    private $userService;

    /**
     * UserController constructor.
     * @param  SocialService  $socialService
     * @param  HashtagService  $hashtagService
     */
    public function __construct(SocialService $socialService, HashtagService $hashtagService, UserService $userService)
    {
        $this->socialService = $socialService;
        $this->hashtagService = $hashtagService;
        $this->userService = $userService;
    }

    /**
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function getProfileData()
    {
        $user = auth()->user();
        if (!$user->status) {

            $data = $this->saveSocialData($user);

            return $data;
        }

        $user->avatar = $this->getUserAvatar($user);
        $user->ig = $this->socialService->getInstagramAccountDescription($user->igAccount->igid);
        $user->hashtags = $user->igAccount->hashtags()->get(['name', 'igid']);
        $user->adset_pref = $this->socialService->getBudget($user->adaccount->adset->adset_id);

        return response(new UserProfile($user));
    }

    /**
     * @param $user
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function saveSocialData(User $user)
    {
        $pages = $this->socialService->getPages();

        foreach ($pages->data as $page) {

            $adaccount = $this->socialService->getUserAdAccounts();
            $adaccount = $this->userService->setUserAdAccount($adaccount);

            $igBusinessAccount = $page->instagram_business_account ?? null;
            $businessCategories = $page->category_list ?? null;
            $location = (isset($page->location)) ? $page->location : null;
            if ($igBusinessAccount) {
                $igId = $igBusinessAccount->id ?? 0;


                if (!$user->igAccount) {

                    $instagramActorIdObj = $this->socialService->getInstagramActorID($page->id);
                    $instagramActorId =$instagramActorIdObj->instagram_accounts->data[0]->id;
                    $instagramActorIdFB =$instagramActorIdObj->id;

                    $user->igAccount = $this->userService->saveIgAccount($igId, $user->id,$instagramActorId,$instagramActorIdFB);
                }

                $postArray = $this->socialService->getAccountHashtags($igId, 30);
                $hashTagsArray = $this->hashtagService->parseUserHashtags($postArray->data) ?? '';

                if ($hashTagsArray->isNotEmpty()) {

                    $hashTagIDArray = $this->hashtagService->saveHashTags(
                        $hashTagsArray,
                        $this->socialService,
                        $igId,
                        auth()->user()->getRememberToken()
                    );
                    $user->igAccount->hashtags()->sync($hashTagIDArray);
                }
                $businessCategories = $this->userService->setUserBusinessCategory($businessCategories);
                $location = $this->userService->setUserLocation($location);
                if(!$location)
                {
                    return response(
                        [
                            'error' => __(
                                'Please add your location at your facebook page settings.'
                            ),
                        ],
                        422
                    );
                }


                $user->igAccount->businesses()->sync($businessCategories);

                $user->status = 1;
                unset($user->igAccount);
                $user->save();

                $adset = $this->socialService->createAdSet();
                $adset = $this->userService->setUserAdset($adset);

                return response(
                    [
                        'success' => __(
                            'Data has been stored'
                        ),
                    ],
                    200
                );
            }
        }

        if (!$user->status) {
            return response(
                [
                    'error' => __(
                        'The account you’ve logged in with doesn’t have a Business Instagram account connected. You can link your Facebook account in the Instagram Profile settings.'
                    ),
                ],
                422
            );
        }
    }

    /**
     * @param $user
     * @return \Illuminate\Contracts\Routing\UrlGenerator|string
     */
    private function getUserAvatar($user)
    {
        $avatar = url('images/avatar_placeholder.png');
        $file = $user->files()->value('link');
        if (file_exists($file)) {
            $avatar = Storage::disk('public')->url(
                'avatars/'.$user->files()->value('name')
            );
        }

        return $avatar;
    }

    /**
     *
     */
    public function saveAdAccount()
    {
        $data = $this->socialService->getUserAdAccounts();

        $adaccount = $data->data[0] ?? 0;
        $user = auth()->user();

        $adClass = new Adaccount();
        $adClass->user_id = $user->id;
        $adClass->ad_id = $adaccount->account_id;
        $adClass->act_ad_id = $adaccount->id;
        $adClass->save();

        return $user->adaccount;
    }

    /**
     * @return string
     */
    public function getRecommendedContent()
    {
        $user = auth()->user();
        $cursor = '';
        $hashtag = $user->igAccount->hashtags()->get(['igid'])->random();

        if (request('cursor')) {
            $cursor = request('cursor');
        }

        if (request()->has('hashtag')) {
            $selectedHashtag = request('hashtag');
            $hashtag = $user->igAccount->hashtags()->where('name', $selectedHashtag)->get(['igid'])->first();
        }

        $content = $this->socialService->getContentByHashtagID($hashtag->igid, $user->igAccount->igid, $cursor);


        return json_encode($content);
    }

    /**
     * @return string
     */
    public function getSocialData()
    {
        $user = auth()->user();
        $response = false;

        if ($user->status) {
            $response = true;
        }

        return json_encode(['ready' => $response]);
    }


}
