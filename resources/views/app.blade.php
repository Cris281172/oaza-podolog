<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        @php($seo = \App\Support\SeoMeta::forRequest(request()))
        @php($structuredData = \App\Support\SeoMeta::structuredData(request(), $page))
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title inertia>{{ $seo['title'] }}</title>
        <meta inertia="description" name="description" content="{{ $seo['description'] }}">
        <meta inertia="robots" name="robots" content="{{ $seo['robots'] }}">
        <link inertia="canonical" rel="canonical" href="{{ $seo['canonical'] }}">
        <meta inertia="og:title" property="og:title" content="{{ $seo['title'] }}">
        <meta inertia="og:description" property="og:description" content="{{ $seo['description'] }}">
        <meta inertia="og:type" property="og:type" content="website">
        <meta inertia="og:locale" property="og:locale" content="pl_PL">
        <meta inertia="og:site_name" property="og:site_name" content="Gabinet Podologiczny OAZA">
        <meta inertia="og:url" property="og:url" content="{{ $seo['canonical'] }}">
        <meta inertia="og:image" property="og:image" content="{{ $seo['image'] }}">
        <meta inertia="twitter:card" name="twitter:card" content="summary_large_image">
        <meta inertia="twitter:title" name="twitter:title" content="{{ $seo['title'] }}">
        <meta inertia="twitter:description" name="twitter:description" content="{{ $seo['description'] }}">
        <meta inertia="twitter:image" name="twitter:image" content="{{ $seo['image'] }}">
        @foreach ($structuredData as $index => $schema)
            <script inertia="structured-data-{{ $index }}" type="application/ld+json">{!! json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG) !!}</script>
        @endforeach

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';
                //
                // if (appearance === 'system') {
                //     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                //
                //     if (prefersDark) {
                //         document.documentElement.classList.add('dark');
                //     }
                // }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
