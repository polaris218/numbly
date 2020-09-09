<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\{
    Auth, Redirect, Storage
};
use Symfony\Component\HttpFoundation\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\JWT;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function facebookLogin(UserService $service)
    {

        $account = $service->getSocialAccount();

        if ($account) {
            $user = $service->createOrGetUser($account);

            auth()->login($user);
            return $this->getUserResponse($user);
        }

        return response(__('user.not_found'), 404);
    }

    private function getUserResponse($user)
    {
        return [
            'token' => JWTAuth::fromUser($user),
        ];
    }

    public function facebookLoginCallback(UserService $service)
    {

        $account = Socialite::driver('facebook')->fields(
            ['id', 'name', 'email']
        )->stateless()->user();

        $user = $service->createOrGetUser($account);
        $user->remember_token = $account->token;
        $user->save();

        auth()->login($user);

        $state = \request('state') ;
        if($state) {
            return Redirect::to(
                'http://'.$state.'auth/facebookRedirect?'.http_build_query(
                    $this->getUserResponse($user)
                )
            );
        }
        return Redirect::to(
            config('app.front_url').'auth/facebookRedirect?'.http_build_query(
                $this->getUserResponse($user)
            )
        );
    }
    public function switchToken(Request $request)
    {
       $token = \auth('api')->refresh();
       $user = JWTAuth::setToken($token)->toUser();
        return response()->json([
            'token'             => $token,
        ]);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json(
            [
                'access_token' => $token,
                'expires_in'   => auth()->factory()->getTTL() * 60,
                'token_type'   => 'Bearer',
            ]
        );
    }

    private function addUser($user)
    {

        $data = [
            'name'     => $user->getName(),
            'email'    => $user->getEmail(),
            'password' => Hash::make(uniqid()),
        ];

        return User::create($data);
    }
    public function login()
    {
        $credentials = request(['email', 'password']);
        $user = User::find(8);
        if ( ! $token = auth()->login($user)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }



}
