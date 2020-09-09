<?php

namespace App\Services;

use App\Models\Adpost;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;

class PostService
{


    const STORAGE_DISK = 'public/posts/';
    const FILE_EXT = '.jpg';
    protected $socialService;

    public function __construct(SocialService $socialService)
    {
        $this->socialService = $socialService;
    }

    public function savePost($post)
    {
        $user = auth()->user();

        $savedPost = new Post();
        $savedPost->user_id = auth()->user()->id;
        $savedPost->caption = $post->caption ?? '';
        $image = file_get_contents($post->image);
        $name = auth()->user()->id.now()->timestamp.self::FILE_EXT;
        //$containerID = $this->socialService->createIGMediaContainer($user->igAccount->igid, $token, $path, $post->caption);

        Storage::put('/public/posts/'.$name, $image);
        $savedPost->image = $name;
        $savedPost->save();


        return $name;

    }

    public function deletePost(Post $post)
    {
        $user = auth()->user();
        if ($post->user_id === $user->id) {
            Storage::disk(config('defaults.storage_disk'))->delete($post->image);
            $post->delete();

            return response(
                [
                    'success' => __(
                        'Post has been deleted'
                    ),
                ],
                200
            );
        }

        return response(
            [
                'error' => __(
                    'You are not allowed to do this action'
                ),
            ],
            401
        );

    }

    public function saveAdPost($post)
    {
        $user = auth()->user();
        $savedPost = new Adpost();
        $savedPost->user_id = auth()->user()->id;
        $savedPost->caption = $post->caption ?? '';
        $image = file_get_contents($post->image);
        $name = auth()->user()->id.now()->timestamp.self::FILE_EXT;
        $path = '/public/adposts/';
        Storage::put($path.$name, $image);
        $savedPost->image = $name;
        $savedPost->save();
        $imageHash = $this->socialService->getImageHash(Storage::path($path.$name), $user->adaccount);
        $adCreative = $this->socialService->createAdCreative($post->caption ?? '', $user->adaccount->act_ad_id,
            $imageHash->images->$name->hash, $user->igAccount->fb_ig_id, $user->igAccount->fb_id);
        if (isset($adCreative->error)) {
            return response(
                [
                    'error' => __(
                        'This image has low resolution, please choose another one :(.'
                    ),
                ],
                422
            );
        }
        $ad = $this->socialService->createAd(substr($post->caption, 0, 29) ?? 'Nimbly', $user->adaccount->act_ad_id,
            $user->adaccount->adset->adset_id, $adCreative->id);
        if (isset($ad->error)) {
            return response(
                [
                    'error' => __(
                        'This image has low resolution, please choose another one :(.'
                    ),
                ],
                422
            );
        }
        return response($name);

    }


}