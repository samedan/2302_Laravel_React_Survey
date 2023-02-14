import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import QuestionEditor from "./QuestionEditor";

export default function SurveyQuestions({ survey, onSurveyUpdate }) {
    const [model, setModel] = useState({ ...survey });

    const addQuestion = (index) => {
        console.log(index);
        index =
            index !== undefined
                ? // (Add small Question button in Between Questions)
                  index
                : // index=undefined (Add New Question button) -> last position in the list of questions (NEW Question)
                  model.questions.length - 1;
        model.questions.splice(
            index,
            0, // how many elements to delete
            {
                id: uuidv4(),
                type: "text",
                question: "",
                description: "",
                data: {},
            }
        );
        setModel({
            ...model,
            questions: [...model.questions],
        });
    };

    const questionChange = (question) => {
        if (!question) return;
        const newQuestions = model.questions.map((q) => {
            if (q.id == question.id) {
                return { ...question }; // update question
            }
            return q;
        });
        setModel({
            ...model,
            questions: newQuestions,
        });
    };

    const deleteQuestion = (question) => {
        const newQuestions = model.questions.filter(
            (q) => q.id !== question.id
        );
        setModel({
            ...model,
            questions: newQuestions,
        });
    };

    useEffect(() => {
        onSurveyUpdate(model);
    }, [model]);

    return (
        <>
            <div className="flex justify-between">
                <h3 className="text-2xl font-bold">Questions</h3>
                <button
                    onClick={() => addQuestion()}
                    className="flex bg-gray-600 hover:bg-gray-700 items-center text-sm py-1 px-4 rounded-sm text-white"
                >
                    <PlusIcon className="w-4 mr-2" />
                    Add Question (last question)
                </button>
            </div>
            {model.questions.length ? (
                model.questions.map((q, ind) => (
                    <QuestionEditor
                        key={q.id}
                        index={ind}
                        question={q}
                        questionChange={questionChange}
                        addQuestion={addQuestion}
                        deleteQuestion={deleteQuestion}
                    />
                ))
            ) : (
                <div className="text-gray-400 text-center py-4">
                    No questions created yet
                </div>
            )}
        </>
    );
}
