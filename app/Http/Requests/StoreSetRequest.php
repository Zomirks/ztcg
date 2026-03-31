<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSetRequest extends FormRequest
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
            'tcg_id' => ['required', 'exists:tcgs,id'],
            'name' => ['required', 'string'],
            'code' => ['required', 'string',
                Rule::unique('sets', 'code')->where('tcg_id', $this->input('tcg_id'))],
        ];
    }

    public function messages(): array
    {
        return [
            'code.unique' => 'Ce code existe déjà.',
            'tcg_id.exists' => 'Cette licence de TCG n\'existe pas.',
        ];
    }
}
