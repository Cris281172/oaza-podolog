<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectToCanonicalUrl
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! app()->environment('production')) {
            return $next($request);
        }

        $canonicalUrl = rtrim((string) config('app.url'), '/');
        $canonicalHost = parse_url($canonicalUrl, PHP_URL_HOST);
        $canonicalScheme = parse_url($canonicalUrl, PHP_URL_SCHEME);
        $forwardedScheme = trim(explode(',', (string) $request->header('X-Forwarded-Proto', $request->getScheme()))[0]);

        if ($canonicalHost && ($request->getHost() !== $canonicalHost || $forwardedScheme !== $canonicalScheme)) {
            $target = $canonicalUrl.($request->path() === '/' ? '' : '/'.$request->path());
            $target .= $request->getQueryString() ? '?'.$request->getQueryString() : '';

            return redirect()->away($target, 301);
        }

        return $next($request);
    }
}
