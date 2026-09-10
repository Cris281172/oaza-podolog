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
        $canonicalSlug = self::canonicalSlug($slug);

        if ($canonicalSlug && ($configured = self::get($canonicalSlug))) {
            return [...$configured, 'slug' => $slug];
        }

        $service = Service::query()->where('slug', $slug)->first();

        if (! $service) {
            return null;
        }

        return self::fromModel($service);
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

    public static function fromModel(Service $service): array
    {
        $description = trim($service->short_description) ?: "Profesjonalna usługa podologiczna: {$service->name}.";

        return [
            'slug' => $service->slug,
            'seo' => [
                'title' => "{$service->name} Kielce | Podologiczna Oaza",
                'description' => "{$description} Umów wizytę w gabinecie Podologiczna Oaza w Kielcach.",
            ],
            'hero' => [
                'title' => $service->name,
                'text' => $description,
            ],
            'treatment' => [
                'title' => 'Na czym polega usługa?',
                'paragraphs' => [
                    $description,
                    'Wizyta rozpoczyna się od rozmowy oraz oceny problemu. Na tej podstawie podolog dobiera zakres usługi odpowiedni do aktualnego stanu stóp i paznokci.',
                    'Postępowanie prowadzone jest z uwzględnieniem komfortu, bezpieczeństwa oraz indywidualnych potrzeb pacjenta.',
                ],
            ],
            'steps' => [
                ['title' => 'Ocena', 'desc' => 'Rozmowa i dokładna ocena zgłaszanego problemu.'],
                ['title' => 'Usługa', 'desc' => 'Wykonanie odpowiednio dobranych czynności podologicznych.'],
                ['title' => 'Zalecenia', 'desc' => 'Wskazówki dotyczące pielęgnacji i dalszego postępowania.'],
            ],
            'symptoms' => [],
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
