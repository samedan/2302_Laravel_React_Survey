<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SurveyQuestion extends Model
{
    use HasFactory;
    protected $fillable = ['id', 
    'type', 
    'question', 'description', 
    // Str::markdown('conseils'),
    'conseils',  
    'data', 'survey_id'];

    // private function conseils() {
    //     $ourHTML = Str::markdown($this['conseils']);
    //     $this['conseils'] = $ourHTML;
    //     return $this;
    // }
}
