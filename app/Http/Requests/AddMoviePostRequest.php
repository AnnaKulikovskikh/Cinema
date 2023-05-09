<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddMoviePostRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|unique:movies|max:255',
            'duration' => 'required|integer|max:300',
        ];
    }
}
