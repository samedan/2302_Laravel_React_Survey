<?php

namespace App\Http\Resources;

use App\Http\Resources\SurveyResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SurveyAnswerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'survey' => new SurveyResource($this->survey),
            'end_date' => $this->end_date,
            'user' => $this->user,
            'age' => $this->age,
            'weight' => $this->weight,
            'height' => $this->height,
            'other' => $this->other           

        ];
    }
}
