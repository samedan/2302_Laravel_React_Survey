<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\SurveyAnswer;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionAnswer;
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
    public function getAllAnswers(Request $request) {
        
        //Latest 5 answers
        $allAnswers = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            // ->where('surveys.user_id', $user->id)
            // ->orderBy('end_date', 'DESC')
            ->orderBy('start_date', 'DESC')
            ->paginate(10);
            // ->getModels('survey_answers.*');

            return [
                'allAnswers' => $allAnswers,
               
            ];
    }
    public function getAllSurveys(Request $request) {
        $allSurveys = Survey::get();
    
        // $allSurveys = Survey::get()->orderBy('description');
         return [
                'allAnswers' => $allSurveys,
               
            ];
    }
    

    

    public function getSurveysForPatient(Request $request) {
        
        $apiKey = `H8MU9WC4GQRDWKAFQ23WRY1HA4CQSBRD`;
        $authorizationKey = base64_encode("H8MU9WC4GQRDWKAFQ23WRY1HA4CQSBRD"); // VUNDTExROU4yQVJTSFdDWExUNzRLVUtTU0szNEJGS1g6
        // SDhNVTlXQzRHUVJEV0tBRlEyM1dSWTFIQTRDUVNCUkQ=
        // https://devdocs.prestashop-project.org/8/webservice/tutorials/testing-access/
        // $user = $request->user();
        $user = $request;
        // return $user;
        // Total number of surveys
        // $total = SurveyAnswer::query()->where('user_id', $user->id)->count();
        $total = SurveyAnswer::query()->where('other', $user->user)->count();
        // Latest survey
        // $latest = Survey::query()->where('user_id', $user->id)->latest('created_at')->first();
        
        // // Total number of answers
        $totalAnswersByUser = SurveyAnswer::query()
            // ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            // ->where('surveys.user_id', $user->id)
            ->where('survey_answers.other', $user->user)                   
            ->getModels('survey_answers.*');

        // // Total Questions answered
        $totalQuestionsAnswered = SurveyQuestion::get();

        // Answers by user
        $answersByUser = SurveyQuestionAnswer::query()
            // ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            // ->where('surveys.user_id', $user->id)
            ->where('survey_question_answers.other_id', $user->user)                   
            ->getModels('survey_question_answers.*');
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
                'authorizationKey'=>$authorizationKey,
                'answersByUser'=>$answersByUser,
                'totalQuestions'=>$totalQuestionsAnswered,
                'totalAnswers' => $total,
                'totalAnswersByUser' => $totalAnswersByUser,
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

    public function getPatientAndAnswers(Request $request) {
        // $user = $request->user();
        $user = $request;

        $patientDataAnswers = SurveyQuestionAnswer::query()->where('other_id', $user->user)->get();
        // PatientData SurveysAnswered
        $patientDataSurveysAnswered = SurveyAnswer::query()->where('other', $user->user)->get();
        // $patientQuestionsAnswered = SurveyQuestion::query()
        //     ->where('survey_questions.id', $user->user)->get();                   
        $patientQuestionsAnswered = SurveyQuestion::get();                   
        $totalSurveys = Survey::get();                   
            

        // $surveysAnswered = $totalSurveys->query->where('survey_question_id.other_id', $user->user)                   
        // ->getModels('survey_question_answers.*');
        
        // $surveysAnswered = SurveyAnswer::query()->where('survey_id', $totalSurveys->id)->get();
        // SurveyAnswer::query()->where('other', $user->user)->get()->value('survey_question_id');
        // $surveysAnswered= $patientDataAnswers->where('survey_id', '9')->get();
        // $surveysAnswered= $patientDataSurveysAnswered['survey_id'];

        // WORKs
        // $surveysAnswered= SurveyAnswer::query()->where('other', $user->user)->pluck('survey_id');
        // WORKs
        $surveysAnsweredB= SurveyAnswer::query()->where('other', $user->user)->pluck('survey_id');

        

        $surveysAnswered = Survey::whereIn('id', $surveysAnsweredB)->get();;
       
       
        

        // $latestAnswers = SurveyAnswer::query()
        //     ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
        //     ->where('surveys.user_id', $user->id)
        //     ->orderBy('end_date', 'DESC')
        //     ->limit(5)
        //     ->getModels('survey_answers.*');

        
        
        // Total number of surveys
        // $total = SurveyAnswer::query()->where('user_id', $user->id)->count();
        // $total = SurveyAnswer::query()->where('other', $user->user)->count();
        
        // // Total number of answers
        // $totalAnswersByUser = SurveyAnswer::query()
          
            // ->where('survey_answers.other', $user->user)                   
            // ->getModels('survey_answers.*');

      
        // Total surveys
      
        // $totalSurveysNumber = Survey::query()->count();
        // // Total surveys
      
        // $totalSurveys = Survey::get();

       

      
            return [
                'surveysAnswered' => $surveysAnswered,


                'patientData' => $patientDataSurveysAnswered,
                'patientDataAnswers' => $patientDataAnswers,
                'patientQuestionsAnswered' => $patientQuestionsAnswered,
                'user' => $user->user,
                'totalSurveys' => $totalSurveys,



                
                // 'totalAnswersByUser' => $totalAnswersByUser,
                // // 'totalSurveysLeft' => $totalSurveysLeft,
                // 'totalSurveysNumber' => $totalSurveysNumber,
                // 'totalSurveys' => $totalSurveys,
                // 'extract' => $extract,
                // 'extract2' => $extract2,
                // 'latestSurveys' => $latestSurveys,
                // 'latestSurvey' => $latest ? new SurveyResourceDashboard($latest): null,
                // 'totalAnswers' => $totalAnswers,
                // 'latestAnswers' => SurveyAnswerResource::collection($latestAnswers)
            ];
    }
}
