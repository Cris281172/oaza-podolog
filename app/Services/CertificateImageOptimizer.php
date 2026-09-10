<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use RuntimeException;

class CertificateImageOptimizer
{
    public function store(UploadedFile $file): array
    {
        $directory = 'certificates';
        Storage::disk('public')->makeDirectory($directory);
        $name = Str::uuid()->toString();
        $imagePath = "{$directory}/{$name}.webp";
        $thumbnailPath = "{$directory}/{$name}-thumb.webp";

        if (class_exists(\Imagick::class)) {
            $this->storeWithImagick($file->getRealPath(), $imagePath, 1800, 82);
            $this->storeWithImagick($file->getRealPath(), $thumbnailPath, 700, 78);
        } else {
            $this->storeWithGd($file->getRealPath(), $file->getMimeType(), $imagePath, 1800, 82);
            $this->storeWithGd($file->getRealPath(), $file->getMimeType(), $thumbnailPath, 700, 78);
        }

        return [
            'image_path' => Storage::url($imagePath),
            'thumbnail_path' => Storage::url($thumbnailPath),
        ];
    }

    private function storeWithImagick(string $source, string $target, int $maxSize, int $quality): void
    {
        $image = new \Imagick($source);
        $image->autoOrient();
        $image->thumbnailImage($maxSize, $maxSize, true, true);
        $image->setImageFormat('webp');
        $image->setImageCompressionQuality($quality);
        $image->stripImage();
        $image->writeImage(Storage::disk('public')->path($target));
        $image->clear();
    }

    private function storeWithGd(string $source, ?string $mime, string $target, int $maxSize, int $quality): void
    {
        $image = match ($mime) {
            'image/jpeg' => imagecreatefromjpeg($source),
            'image/png' => imagecreatefrompng($source),
            'image/webp' => imagecreatefromwebp($source),
            default => false,
        };

        if ($image === false) {
            throw new RuntimeException('Nie udało się przetworzyć obrazu.');
        }

        $width = imagesx($image);
        $height = imagesy($image);
        $scale = min(1, $maxSize / max($width, $height));
        $newWidth = max(1, (int) round($width * $scale));
        $newHeight = max(1, (int) round($height * $scale));
        $resized = imagecreatetruecolor($newWidth, $newHeight);
        imagealphablending($resized, false);
        imagesavealpha($resized, true);
        imagecopyresampled($resized, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
        imagewebp($resized, Storage::disk('public')->path($target), $quality);
        imagedestroy($image);
        imagedestroy($resized);
    }
}
