<?php
/**
 * Created by PhpStorm.
 * User: macmini2018_06
 * Date: 25/09/2019
 * Time: 15:34
 */

namespace App\Services;


use App\Models\Hashtag;
use Illuminate\Support\Collection;

class HashtagService
{
    public function parseUserHashtags($posts)
    {
        $hashTagsArray = new Collection();

        foreach ($posts as $post) {
            $caption = $post->caption ?? null;

            if (!$caption) {
                continue;
            }

            preg_match_all('/#([\w]+)/', $caption, $hashTags);

            if ($hashTags && $hashTags[1]) {
                $hashTagsArray->push($hashTags[1]);
            }

        }

        $hashTagsArray = $hashTagsArray->flatten(0);

        $sortedArray = $hashTagsArray->reduce(
            function ($carry, $item) {

                $key = array_search($item, array_column($carry, 'hashtag'));;

                if (!$key) {
                    $carry[] = ['hashtag' => $item, 'q' => 1];

                    return $carry;
                }

                $carry[$key]['q'] += 1;

                return $carry;
            }
            ,
            []
        );
        $sortedArray = collect($sortedArray)->sortByDesc(
            function ($hashtag, $key) {
                return $hashtag['q'];
            }
        );

        return $sortedArray->take(10)->values();
    }

    public function saveHashTags($array, SocialService $socialService, $igId, $token)
    {
        $hashTagsArray = $array->map(
            function ($hashTag) use ($igId, $token, $socialService) {

                $hashtagIgID = $socialService->getHashTagsID(
                    $hashTag['hashtag'],
                    $igId,
                    $token
                );

                if (!isset($hashtagIgID->error)) {

                    $hashTag['igid'] = $hashtagIgID->data[0]->id;
                    $hashTagModel = Hashtag::updateOrCreate(
                        ['name' => $hashTag['hashtag'], 'igid' => $hashTag['igid']]
                    );

                    return $hashTagModel->id;
                }

                return false;
            }
        );

        return $hashTagsArray->filter();
    }
}