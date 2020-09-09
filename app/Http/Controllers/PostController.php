<?php

namespace App\Http\Controllers;

use App\Http\Requests\SavePostRequest;
use App\Models\Post;
use App\Services\PostService;

class PostController extends Controller
{

    protected $postService;


    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    public function index()
    {
        $user = auth()->user();
        $posts = $user->posts;

        return response($posts);
    }

    public function showAdposts()
    {
        $user = auth()->user();
        $posts = $user->adposts;

        return response($posts);
    }

    public function savePost(SavePostRequest $post)
    {
        $post = $this->postService->savePost($post);

        return $post;
    }

    public function deletePost(Post $post)
    {
        $post = $this->postService->deletePost($post);


    }

    public function saveAdPost(SavePostRequest $post)
    {
        $post = $this->postService->saveAdPost($post);

        return $post;
    }


}
