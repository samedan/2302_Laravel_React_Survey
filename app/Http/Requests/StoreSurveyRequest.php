<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSurveyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    protected function prepareForValidation() {
        
        // return $this->user();
        //// 'user_id' => $this->user()->id
        $this->merge([
            
            'user_id' => '6'
            
        ]);
    }
    // $my_model->sites = [1,2,3];

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        // 'user_id' => 'exists:users,id',
        return [
            'title' => 'required|string|max:1000',
            'image' => 'nullable|string',
            
            'user_id' => 'required|string',
            'status' => 'required|boolean',
            'description' => 'nullable|string',
            'conseils' => 'nullable|string',
            'expire_date' => 'required|date|after:today', // nullable(not required)
            'questions' => 'array'
        ];
    }
}
