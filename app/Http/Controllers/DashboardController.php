<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\SurveyAnswer;
use Illuminate\Http\Request;
use App\Http\Resources\SurveyAnswerResource;
use App\Http\Resources\SurveyResourceDashboard;
use App\Http\Resources\SurveyResource;

class DashboardController extends Controller
{
    public function index(Request $request) {
        $user = $request->user();
        // Total number of surveys
        $total = Survey::query()->where('user_id', $user->id)->count();
        // Latest survey
        $latest = Survey::query()->where('user_id', $user->id)->latest('created_at')->first();
        
        // Total number of answers
        $totalAnswers = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->count();

        //Latest 5 answers
        $latestAnswers = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->orderBy('end_date', 'DESC')
            ->limit(5)
            ->getModels('survey_answers.*');

            return [
                'totalSurveys' => $total,
                'latestSurvey' => $latest ? new SurveyResourceDashboard($latest): null,
                'totalAnswers' => $totalAnswers,
                'latestAnswers' => SurveyAnswerResource::collection($latestAnswers)
            ];
    }
    public function getSurveysForPatient(Request $request) {
        // $user = $request->user();
        $user = $request;
        // return $user;
        // Total number of surveys
        // $total = SurveyAnswer::query()->where('user_id', $user->id)->count();
        $total = SurveyAnswer::query()->where('user', $user->user)->count();
        // Latest survey
        // $latest = Survey::query()->where('user_id', $user->id)->latest('created_at')->first();
        
        // // Total number of answers
        $totalAnswersByUser = SurveyAnswer::query()
            // ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            // ->where('surveys.user_id', $user->id)
            ->where('survey_answers.user', $user->user)                   
            ->getModels('survey_answers.*');

        // $extract = $totalAnswersByUser[0]['survey_id'];
        // $extract2 = $totalAnswersByUser[1]['survey_id'];

        // $studivs = array();
        // $i = 0;
        // do {
        //     $studivs[] = $totalAnswersByUser[$i]['survey_id'];
        // } while ($i > 0);
        // $studivs = array();
        // loop over $divisionIDs to get div_ids 
        // foreach ($divisionID as $div) 
        //     {
        //         $studivs[] = $div->id ;  
        //     }

        // Total surveys
        // Total number of surveys
        $totalSurveysNumber = Survey::query()->count();
        // Total surveys
        // $totalSurveys = Survey::get()->where('id', 3);
        $totalSurveys = Survey::get();

        // Total surveys left for user
        // $totalSurveysLeft = SurveyResource::collection (
        //     Survey::where('id','!=' , $extract
        // )
        //     ->orderBy('created_at', 'desc')
        //     ->paginate(2)
            
        //     );

        // Surveys user didint do
        // $totalSurveys = Survey::get();
        
        // Latest survey
        // $latestSurveys = Survey::query()->latest('created_at')->first();

        // //Latest 5 answers
        // $latestAnswers = SurveyAnswer::query()
        //     ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
        //     ->where('surveys.user_id', $user->id)
        //     ->orderBy('end_date', 'DESC')
        //     ->limit(5)
        //     ->getModels('survey_answers.*');

            return [
                // '$studivs'=> $studivs,
                'totalAnswers' => $total,
                'totalAnswersByUser' => $totalAnswersByUser,
                // 'totalSurveysLeft' => $totalSurveysLeft,
                'totalSurveysNumber' => $totalSurveysNumber,
                'totalSurveys' => $totalSurveys,
                // 'extract' => $extract,
                // 'extract2' => $extract2,
                // 'latestSurveys' => $latestSurveys,
                // 'latestSurvey' => $latest ? new SurveyResourceDashboard($latest): null,
                // 'totalAnswers' => $totalAnswers,
                // 'latestAnswers' => SurveyAnswerResource::collection($latestAnswers)
            ];
    }
}
