<?php

namespace App\Http\Middleware;

use Closure;

class CheckUserMiddleware
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
        if (!auth()->user())
            return response()->json(['error' => __('auth.missing_token')], 401);

        return $next($request);    }
}
