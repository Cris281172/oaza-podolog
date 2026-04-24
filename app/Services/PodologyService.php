<?php

namespace App\Services;

class PodologyService
{
    public static function getAll(): array
    {
        return config('podology_services');
    }

    public static function get(string $slug): ?array
    {
        return config("podology_services.$slug");
    }

    public static function getCrossSell(string $slug, int $limit = 3): array
    {
        $services = self::getAll();
        $current = $services[$slug] ?? null;

        if (!$current) {
            return [];
        }

        $currentTags = $current['tags'] ?? [];
        $currentCategory = $current['category'] ?? null;

        return collect($services)
            ->reject(fn ($item, $key) => $key === $slug)
            ->map(fn ($item, $key) => array_merge($item, ['slug' => $key]))
            ->sortByDesc(function ($service) use ($currentTags, $currentCategory) {
                $score = 0;

                if (($service['category'] ?? null) === $currentCategory) {
                    $score += 10;
                }

                $tags = $service['tags'] ?? [];
                $score += count(array_intersect($tags, $currentTags));

                return $score;
            })
            ->take($limit)
            ->values()
            ->toArray();
    }
}
