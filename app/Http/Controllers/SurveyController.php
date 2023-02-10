<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Survey;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Http\Resources\SurveyResource;
use App\Http\Requests\StoreSurveyRequest;
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
            ->paginate(10));
    }

    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSurveyRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSurveyRequest $request)
    {
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
    public function show(Survey $survey)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function destroy(Survey $survey)
    {
        //
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
        if(is_array($data['data'])) {
            
        }

    }




}
