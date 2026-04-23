<?php

namespace App\Http\Requests;

use App\Enums\Language;
use App\Enums\ProductType;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
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
            'image' => ['sometimes', 'nullable', 'image', 'max:2048', 'mimes:jpg,jpeg,png,webp'],
            'language' => ['sometimes', new Enum(Language::class)],
            'name' => ['nullable', 'string'],
            'product_type' => ['sometimes', new Enum(ProductType::class)],
            'release_date' => ['nullable', 'date'],
            'barcode' => ['sometimes', 'nullable', 'string', Rule::unique('products', 'barcode')->ignore($this->product)],
            'boosters_count' => ['sometimes', 'nullable', 'integer', 'min:1'],
            'set_id' => ['sometimes', 'exists:sets,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'set_id.exists' => 'Ce set n\'existe pas.',
            'language.enum' => 'La langue sélectionnée est invalide.',
            'product_type.enum' => 'Le type de produit sélectionné est invalide.',
            'base_price.min' => 'Le prix ne peut pas être négatif.',
            'barcode.unique' => 'Un produit existant possède déjà ce code-barres',
            'boosters_count.min' => 'Le nombre de booster est au minimum de 1',
            'image.max' => 'L\'image téléchargée est trop lourde',
            'image.mimes' => 'Le type d\'image téléchargée n\'est pas supporté',
            'release_date.date' => 'La date de sortie est invalide.',
            'remove_image' => ['sometimes', 'boolean'],
        ];
    }
}
