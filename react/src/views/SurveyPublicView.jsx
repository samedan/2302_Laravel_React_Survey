import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicQuestionView from "../components/PublicQuestionView";
import axiosClient from "./../axios";

export default function SurveyPublicView() {
    const answers = {};
    const [survey, setSurvey] = useState({ questions: [] });
    const [loading, setLoading] = useState(false);
    const { slug } = useParams();

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get(`survey/get-by-slug/${slug}`)
            .then(({ data }) => {
                setLoading(false);
                setSurvey(data.data);
                // console.log(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    function answerChanged(question, value) {
        answers[question.id] = value;
        console.log(question, value);
    }

    function onSubmit(ev) {
        ev.preventDefault();
        console.log(answers);
    }

    // return <div>{JSON.stringify(survey, undefined, 2)}</div>;
    return (
        <div>
            {loading && <div className="flex justify-center">Loading...</div>}
            {!loading && (
                <form
                    onSubmit={(ev) => onSubmit(ev)}
                    className="container mx-auto px-4"
                >
                    <div className="grid grid-cols-6">
                        <div className="mr-4">
                            <img src={survey.image_url} alt="" />
                        </div>
                        <div className="col-span-5">
                            <h1 className="text-3xl mb-3">
                                Title: {survey.title}
                            </h1>
                            <p className="text-gray-500 text-sm mb-3">
                                Expire date: {survey.expire_date}
                            </p>
                            <p className="text-gray-500 text-sm mb-3">
                                Description: {survey.description}
                            </p>
                        </div>
                    </div>

                    <div>
                        {survey.questions &&
                            survey.questions.map((question, index) => (
                                <PublicQuestionView
                                    key={question.id}
                                    question={question}
                                    index={index}
                                    answerChanged={(val) =>
                                        answerChanged(question, val)
                                    }
                                />
                            ))}
                    </div>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 borer border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600
                        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
}
