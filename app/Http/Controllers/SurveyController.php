<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Survey;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\SurveyQuestion;
use App\Enums\QuestionTypeEnum;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rules\Enum;
use App\Http\Resources\SurveyResource;
use App\Http\Requests\StoreSurveyRequest;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\UpdateSurveyRequest;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        return SurveyResource::collection (Survey::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(2));
    }

    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSurveyRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSurveyRequest $request)
    {
        $data = $request->validated();
        // return $data;
        // dd($data);
        if(isset($data['image'])) { // relative URL savedd in the DBB
            $relativePath = $this->saveImage($data['image']); 
            $data['image'] = $relativePath;
        }
        $survey = Survey::create($data);
        
        // create new questions
        foreach($data['questions'] as $question) {
            $question['survey_id'] = $survey->id;
            $this->createQuestion($question);
        }
        return new SurveyResource($survey);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function show(Survey $survey, Request $request)
    {
        $user = $request->user();
        // check to see if user has permission to read survey
        if($user->id !== $survey->user_id) {
            return abort(403, 'Unauthorized action');
        }
        return new SurveyResource($survey);
    }

    

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSurveyRequest  $request
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        $data = $requets->validated();
        // Check if image was given and save on Local file system
        if(isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;

            // if there is an old image, delete it
            if($survey->image) {
                $absolutePath = public_path($survey->image);
                File::delete($absolutePath);
            }
        }

        // Update survey in the database
        $survey->update($data);
        // Get ids as plain array of existing OLD questions
        $existingIds = $survey->questions()->pluck('id')->toArray(); //The pluck helper method is used to retrieve a list of specific values from a given $array.
        // PLUCK https://www.larashout.com/laravel-pluck-to-extract-certin-values

        // Get ids as plain array of NEW questions
        $newIds = Arr::pluck($data['questions'], 'id');

        // Find questions to delete
        $toDelete = array_diff($existinIds, $newIds);
        // Find questions to add
        $toAdd = array_diff($newIds, $existingIds);

        // Delete questions to $toDelete array
        SurveyQuestion::destroy($toDelete) ;

        // Create new questions
        foreach($data['questions'] as $question) {
            if(in_array($question['id'], $toAdd)) {
                $question['survey_id'] = $survey->id;
                $this->createQuestion($question);
            }
        }

        // Update existing questions
        $questionMap = collect($data['questions'])->keyBy('id');
        foreach($survey->questions as $question) {
            if(isset($questionMap[$question->id])) {
                $this->updateQuestion($question, $questionMap[$question->id]);
            }
        }

        return new SurveyResource($survey);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function destroy(Survey $survey, Request $request)
    {
        $user = $request->user();
        if($user->id !== $survey->user_id) {
            return abort(403, 'Unauthorised action.');
        }
        $survey->delete();

        // If there is an old image, delete it
        if($survey->image) {
            $absolutePath = public_path($survey->image);
            File::delete($absolutePath);
        }
        return response('', 204);
    }

    /**
     * Save image
     */
    public function saveImage($image)
    {
        if(preg_match('/^data:image\/(\w+);base64,/', $image, $type)) { // check if image is in valid base64 string
            // Take out the base64 encoded text without mime type
            $image = substr($image, strpos($image, ',')+1);
            // get file extension
            $type = strtolower($type[1]); // jpg, png, gif
            // check if not an image file extension
            if(!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])){
                throw new Exception('invalid image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if($image === false) {
                throw new Exception('base64_decode failed');
            }
        } else {
            throw new Exception('did not match data URI with image data');
        }

        $dir = 'images/';
        $file = Str::random().'.'.$type;
        $absolutePath = public_path($dir);
        $relativePath = $dir.$file;
        if(!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

        return $relativePath;

    }


    /**
     * Create a question and return
     */
    public function createQuestion($data)
    {
        if(is_array($data['data'])) // data['data'] is a json (encoded {}) with the options
         {
            $data['data'] = json_encode($data['data']);
        }
        $validator = Validator::make($data, [
            'question' => 'required|string',
            'type' => [
                'required', new Enum(QuestionTypeEnum::class)
            ],
                // 'required', Rule::in([
                // QuestionTypeEnum::Text->value,
                // QuestionTypeEnum::Textarea->value,
                // QuestionTypeEnum::Select->value,
                // QuestionTypeEnum::Radio->value,
                // QuestionTypeEnum::Checkbox->value,
                
                // ])],
            'description' => 'nullable|string',
            'data' => 'present',
            'survey_id' => 'exists:App\Models\Survey,id'
        ]);

        return SurveyQuestion::create($validator->validated());

    }


    /**
     * Updates a question and returns true or false
     */
    private function updateQuestion(SurveyQuestion $question, $data) {
        if(is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
        }
        $validator = Validator::make($data, [
            'id' => 'exists:App\Models\SurveyQuestion,id',
            'question' => 'required|string',
            'type' => ['required', new Enum(QuestionTypeEnum::class)],
            'description' =>'nullable|string',
            'data' => 'present'
        ]);
        return $question->update($validator->validated());
    }


}
