<?php

namespace App\Models;

use App\Models\SurveyAnswer;
use Spatie\Sluggable\HasSlug;
use App\Models\SurveyQuestion;
use Spatie\Sluggable\SlugOptions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Survey extends Model
{
    use HasFactory;
    use HasSlug;
    
    protected $fillable = [
        'user_id','title', 'description', 'expire_date', 'status', 'image', 'created_at', 'updated_at' ];


       

        /**
         * Get the options for generating the slug.
         */
        public function getSlugOptions() : SlugOptions
        {
            return SlugOptions::create()
                ->generateSlugsFrom('title')
                ->saveSlugsTo('slug');
        }

        public function questions() {
            return $this->hasMany(SurveyQuestion::class);
        }
        
        public function answers() {
            return $this->hasMany(SurveyAnswer::class); // allows access to SurveyResourceDashboard
        }
}
