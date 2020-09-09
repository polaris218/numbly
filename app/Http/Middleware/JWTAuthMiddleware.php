<?php

namespace App\Http\Middleware;

use Tymon\JWTAuth\Exceptions\{TokenInvalidException, TokenExpiredException};
use Tymon\JWTAuth\Facades\JWTAuth;
use Closure;

class JWTAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            if ($e instanceof TokenInvalidException){
                return response()->json(['error' => 'Token is Invalid'], 401);
            }else if ($e instanceof TokenExpiredException){
                return response()->json(['error' => 'Token is Expired'], 401);
            }else{
                return response()->json(['error' => 'Authorization Token not found'], 401);
            }
        }
        return $next($request);
    }
}
