<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSetRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'tcg_id' => ['sometimes', 'exists:tcgs,id'],
            'name' => ['sometimes', 'string'],
            'code' => ['sometimes', 'string',
                Rule::unique('sets', 'code')->where('tcg_id', $this->input('tcg_id'))->ignore($this->route('set'))],
            'print_code' => ['sometimes', 'nullable', 'string'],
            'logo' => ['sometimes', 'nullable', 'image', 'max:2048'],
            'description' => ['sometimes', 'nullable', 'string'],
            'series' => ['sometimes', 'nullable', 'string'],
            'total_cards' => ['sometimes', 'nullable', 'numeric', 'min:1'],
            'release_date' => ['sometimes', 'nullable', 'date'],
        ];
    }
}
