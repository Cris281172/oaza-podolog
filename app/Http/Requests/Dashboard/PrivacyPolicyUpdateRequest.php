<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class PrivacyPolicyUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'intro' => ['nullable', 'string', 'max:1000'],
            'content' => ['required', 'array'],
            'content.type' => ['required', 'in:doc'],
            'content.content' => ['required', 'array', 'min:1'],
        ];
    }
}
