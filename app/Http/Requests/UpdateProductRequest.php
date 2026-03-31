<?php

namespace App\Http\Requests;

use App\Enums\Language;
use App\Enums\ProductType;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateProductRequest extends FormRequest
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
            'base_price' => ['nullable', 'numeric', 'min:0'],
            'language' => ['sometimes', new Enum(Language::class)],
            'name' => ['nullable', 'string'],
            'product_type' => ['sometimes', new Enum(ProductType::class)],
            'set_id' => ['sometimes', 'exists:sets,id'],
            'release_date' => ['nullable', 'date'],
        ];
    }

    public function messages(): array
    {
        return [
            'set_id.exists' => 'Ce set n\'existe pas.',
            'language.enum' => 'La langue sélectionnée est invalide.',
            'product_type.enum' => 'Le type de produit sélectionné est invalide.',
            'base_price.min' => 'Le prix ne peut pas être négatif.',
            'release_date.date' => 'La date de sortie est invalide.',
        ];
    }
}
