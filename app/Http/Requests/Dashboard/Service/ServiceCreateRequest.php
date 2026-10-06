<?php

namespace App\Http\Requests\Dashboard\Service;

use Illuminate\Foundation\Http\FormRequest;

class ServiceCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:services,slug'],
            'shortDesc' => ['required', 'string', 'max:1000'],
            'pageIntro' => ['required', 'string', 'max:3000'],
            'descriptionHeading' => ['required', 'string', 'max:255'],
            'pageContent' => ['required', 'array'],
            'pageContent.type' => ['required', 'in:doc'],
            'pageContent.content' => ['required', 'array', 'min:1'],
            'seoTitle' => ['required', 'string', 'max:255'],
            'seoDescription' => ['required', 'string', 'max:1000'],
            'categoryID' => ['required', 'exists:service_categories,id'],
        ];
    }
}
