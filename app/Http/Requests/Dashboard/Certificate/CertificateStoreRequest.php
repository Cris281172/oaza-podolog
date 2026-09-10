<?php

namespace App\Http\Requests\Dashboard\Certificate;

use Illuminate\Foundation\Http\FormRequest;

class CertificateStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:160'],
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:15360'],
        ];
    }

    public function messages(): array
    {
        return [
            'image.max' => 'Zdjęcie może mieć maksymalnie 15 MB.',
            'image.mimes' => 'Dozwolone formaty to JPG, PNG i WebP.',
        ];
    }
}
