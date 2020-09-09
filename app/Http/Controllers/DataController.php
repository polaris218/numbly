<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Services\SocialService;

class DataController extends Controller
{
    /**
     * @var SocialService
     */
    private $socialService;

    /**
     * DataController constructor.
     * @param SocialService $socialService
     */
    public function __construct(SocialService $socialService)
    {
        $this->socialService = $socialService;
    }

    public function storeFbBusinessCategories()
    {
        $categories = $this->socialService->getFbBusinessCategories();
        Business::store($categories);
    }

}
