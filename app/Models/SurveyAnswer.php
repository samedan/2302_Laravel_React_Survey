<?php

namespace App\Models;

use App\Models\Survey;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SurveyAnswer extends Model
{
    use HasFactory;
    const UPDATED_AT = null;
    const CREATED_AT = null;
    protected $fillable = ['survey_id', 'start_date', 'end_date', 'user', 'age', 'weight', 'height', 'other'];

    public function survey() {
        return $this->belongsTo(Survey::class); // allows to get the surveys inside SurveyAnswerResource
    }
}
