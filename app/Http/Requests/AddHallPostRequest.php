<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddHallPostRequest extends FormRequest
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
     * 'name' => 'required|unique:halls|max:15',
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['bail', 'required', 'unique:halls', 'max:15']
        ];
    }

    public function messages()
{
    return [
        'name.required' => 'Надо указать название зала!',
        'name.unique' => 'Название зала дложно быть уникальным!',
        'name.max' => 'Длина названия должна быть не более 15 символов!',
    ];
}
}
