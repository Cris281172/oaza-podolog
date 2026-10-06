<?php

namespace App\Services;

use App\Models\Service;

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

    public static function resolve(string $slug): ?array
    {
        $service = Service::query()->where('slug', $slug)->first();

        if ($service) {
            return self::fromModel($service, self::get($slug));
        }

        $canonicalSlug = self::canonicalSlug($slug);

        if ($canonicalSlug) {
            $configured = self::get($canonicalSlug);
            $canonicalService = Service::query()->where('slug', $canonicalSlug)->first();

            if ($canonicalService) {
                return self::fromModel($canonicalService, $configured, $slug);
            }

            if ($configured) {
                return [...$configured, 'slug' => $slug];
            }
        }

        return null;
    }

    public static function canonicalSlug(string $slug): ?string
    {
        $normalizedSlug = mb_strtolower($slug);

        if (self::get($normalizedSlug)) {
            return $normalizedSlug;
        }

        if (str_contains($normalizedSlug, 'mykolog')) {
            return match (true) {
                str_contains($normalizedSlug, 'bezposred') => 'badanie-mykologiczne-bezposrednie',
                str_contains($normalizedSlug, 'hodowl') => 'badanie-mykologiczne-hodowla',
                default => 'badanie-mykologiczne-kompleksowe',
            };
        }

        if (str_contains($normalizedSlug, 'grzyb') && str_contains($normalizedSlug, 'paznok')) {
            return 'terapia-grzybicy-paznokci-i-stop';
        }

        return null;
    }

    public static function fromModel(Service $service, ?array $configured = null, ?string $resolvedSlug = null): array
    {
        $description = trim($service->short_description) ?: "Profesjonalna usługa podologiczna: {$service->name}.";
        $pageIntro = trim((string) $service->page_intro)
            ?: data_get($configured, 'hero.text', $description);
        $descriptionHeading = trim((string) $service->description_heading)
            ?: data_get($configured, 'treatment.title', 'Na czym polega usługa?');
        $seoTitle = trim((string) $service->seo_title)
            ?: data_get($configured, 'seo.title', "{$service->name} Kielce | Gabinet Podologiczna Oaza");
        $seoDescription = trim((string) $service->seo_description)
            ?: data_get($configured, 'seo.description', "{$description} Umów wizytę — Gabinet Podologiczna Oaza w Kielcach.");

        return [
            ...($configured ?? []),
            'slug' => $resolvedSlug ?? $service->slug,
            'seo' => [
                'title' => $seoTitle,
                'description' => $seoDescription,
            ],
            'hero' => [
                'title' => $service->name,
                'text' => $pageIntro,
            ],
            'treatment' => [
                'title' => $descriptionHeading,
                'paragraphs' => data_get($configured, 'treatment.paragraphs', [$description]),
            ],
            'pageContent' => $service->page_content,
        ];
    }

    public static function editorData(Service $service): array
    {
        $configured = self::get($service->slug);

        return [
            'pageIntro' => $service->page_intro ?: data_get($configured, 'hero.text', $service->short_description),
            'descriptionHeading' => $service->description_heading ?: data_get($configured, 'treatment.title', 'Na czym polega usługa?'),
            'pageContent' => $service->page_content ?: self::contentFromConfig($configured, $service->short_description),
            'seoTitle' => $service->seo_title ?: data_get($configured, 'seo.title', "{$service->name} Kielce | Gabinet Podologiczna Oaza"),
            'seoDescription' => $service->seo_description ?: data_get($configured, 'seo.description', $service->short_description),
        ];
    }

    public static function emptyEditorContent(): array
    {
        return [
            'type' => 'doc',
            'content' => [
                [
                    'type' => 'paragraph',
                    'content' => [['type' => 'text', 'text' => 'Wpisz pełny opis usługi.']],
                ],
            ],
        ];
    }

    private static function contentFromConfig(?array $configured, string $fallback): array
    {
        $paragraphs = data_get($configured, 'treatment.paragraphs', []);

        if (! count($paragraphs)) {
            $paragraphs = [$fallback];
        }

        return [
            'type' => 'doc',
            'content' => collect($paragraphs)->map(fn (string $paragraph) => [
                'type' => 'paragraph',
                'content' => [['type' => 'text', 'text' => $paragraph]],
            ])->values()->all(),
        ];
    }

    public static function getCrossSell(string $slug, int $limit = 3): array
    {
        $services = self::getAll();
        $current = $services[$slug] ?? null;

        if (! $current) {
            return [];
        }

        $currentTags = $current['tags'] ?? [];
        $currentCategory = $current['category'] ?? null;
        $relatedCategories = [
            'konsultacje' => ['kompleksowe-zabiegi', 'diagnostyka'],
            'profilaktyka' => ['kompleksowe-zabiegi', 'stopy-zmienione-chorobowo'],
            'stopy-zmienione-chorobowo' => ['kompleksowe-zabiegi', 'diagnostyka'],
            'paznokcie-zmienione-chorobowo' => ['diagnostyka', 'wrastajace-paznokcie'],
            'kompleksowe-zabiegi' => ['profilaktyka', 'stopy-zmienione-chorobowo'],
            'diagnostyka' => ['paznokcie-zmienione-chorobowo', 'stopy-zmienione-chorobowo'],
            'wrastajace-paznokcie' => ['paznokcie-zmienione-chorobowo', 'diagnostyka'],
        ];
        $currentWords = self::tagWords($currentTags);

        return collect($services)
            ->reject(fn ($item, $key) => $key === $slug)
            ->map(fn ($item, $key) => array_merge($item, ['slug' => $key]))
            ->sortByDesc(function ($service) use ($currentTags, $currentCategory, $currentWords, $relatedCategories) {
                $score = 0;

                if (($service['category'] ?? null) === $currentCategory) {
                    $score += 100;
                } elseif (in_array($service['category'] ?? null, $relatedCategories[$currentCategory] ?? [], true)) {
                    $score += 20;
                }

                $tags = $service['tags'] ?? [];
                $score += count(array_intersect($tags, $currentTags)) * 15;
                $score += count(array_intersect(self::tagWords($tags), $currentWords)) * 2;

                return $score;
            })
            ->take($limit)
            ->values()
            ->toArray();
    }

    private static function tagWords(array $tags): array
    {
        $words = preg_split('/[^\pL\pN]+/u', mb_strtolower(implode(' ', $tags))) ?: [];

        return array_values(array_unique(array_filter($words, fn (string $word) => mb_strlen($word) >= 5)));
    }
}
