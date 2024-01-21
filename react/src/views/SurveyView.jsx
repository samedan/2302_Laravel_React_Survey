import { LinkIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
// import QuestionEditor from "../components/QuestionEditor";
import SurveyQuestions from "../components/SurveyQuestions";
import { v4 as uuidv4 } from "uuid";
import axiosClient from "./../axios";
import "tw-elements";
import { useStateContext } from "../contexts/ContextProvider";

export default function SurveyView() {
    const { showToast } = useStateContext();
    const { id } = useParams();
    const navigate = useNavigate();

    const [survey, setSurvey] = useState({
        title: "",
        slug: "",
        status: false,
        description: "",
        image: null,
        image_url: null,
        expire_date: "",
        questions: [],
    });
    const [errors, setErrors] = useState({ __html: "" });
    const [loading, setLoading] = useState(false);
    const [errorExpireDate, setErrorExpireDate] = useState("");
    const [errorTitle, setErrorTitle] = useState("");
    const [surveys, setSurveys] = useState([]); // for order

    // for order / description in survey
    // const getSurveys = (url) => {
    //     url = url || "/survey"; // if first or previous/next pages survey?page=2
    //     setLoading(true);
    //     axiosClient.get(url).then(({ data }) => {
    //         console.log(data.data);
    //         setSurveys(data.data);
    //         setMeta(data.meta);
    //         setLoading(false);
    //     });
    // };

    const onImageChoose = (ev) => {
        // console.log("On Image choose");
        const file = ev.target.files[0];
        const reader = new FileReader(); // Lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.

        reader.onload = () => {
            setSurvey({
                ...survey,
                image: file,
                image_url: reader.result, // base64 of the image
            });
            ev.target.value = "";
        };
        reader.readAsDataURL(file);
    };
    const onSubmit = (ev) => {
        ev.preventDefault();
        setErrors({ __html: "" });

        const payload = { ...survey };

        if (payload.image) {
            payload.image = payload.image_url; // image is part of json
        }
        delete payload.image_url;

        let res = null;
        if (id) {
            // EDIT survey
            res = axiosClient.put(`/survey/${id}`, payload);
        } else {
            // POST new survey
            res = axiosClient.post("/survey", payload);
        }
        console.log(payload);
        res.then((res) => {
            console.log(res);
            navigate("/surveys");
            if (id) {
                showToast("The survey was edited successfully");
            } else {
                showToast("The survey was created");
            }
        }).catch((err) => {
            console.log(err.response.data.errors);
            if (
                err.response.data.errors &&
                err.response.data.errors["expire_date"] !== null
            ) {
                setErrorExpireDate(err.response.data.errors["expire_date"]);
            }
            if (
                err.response.data.errors &&
                err.response.data.errors["title"] !== null
            ) {
                setErrorTitle(err.response.data.errors["title"]);
            }
            if (err.response) {
                console.log(err.response.data);
                if (err.response.data.errors) {
                    console.log("here");
                    const finalErrors = Object.values(
                        err.response.data.errors
                    ).reduce((accum, next) => [...accum, ...next], []);
                    setErrors({ __html: finalErrors.join("<br>") });
                } else {
                    const finalErrors = Object.values(err.response.data);
                    setErrors({ __html: finalErrors[0] });
                }
            }
        });
    };

    const addQuestion = () => {
        survey.questions.push({
            id: uuidv4(),
            type: "text",
            question: "",
            description: "",
            conseils: "",
            data: {},
        });
        setSurvey({ ...survey });
    };

    function onQuestionsUpdate(questions) {
        setSurvey({ ...survey, questions });
    }

    useEffect(() => {
        if (id) {
            setLoading(true);
            // EDIT Page /surveys/11
            axiosClient.get(`/survey/${id}`).then(({ data }) => {
                // debugger;
                setSurvey(data.data);
                setLoading(false);
            });
        }
    }, []);

    const onDelete = () => {};
    return (
        <PageComponent
            title={id ? `Update/edit Survey  ` : "Create New Survey"}
            buttons={
                <div className="flex gap-2">
                    <TButton
                        color="green"
                        href={`/survey/public/${survey.slug}`}
                    >
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Public link
                    </TButton>
                    <TButton color="red" onClick={onDelete}>
                        <TrashIcon className="h-4 w-4 mr-2" />
                        Delete
                    </TButton>
                </div>
            }
        >
            {!loading && (
                <form action="#" method="POST" onSubmit={onSubmit}>
                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                            {/* {errors && (
                            <div className="bg-red-500 text-white py-3 px-3">
                                {errors}
                            </div>
                        )} */}

                            {errors.__html && (
                                <div
                                    className="bg-red-500 rounded py-2 px-3 text-white"
                                    dangerouslySetInnerHTML={errors}
                                ></div>
                            )}

                            {/*Image*/}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Photo
                                </label>
                                <div className="mt-1 flex items-center">
                                    {survey.image_url && (
                                        <img
                                            src={survey.image_url}
                                            alt=""
                                            className="w-32 h-32 object-cover"
                                        />
                                    )}
                                    {!survey.image_url && (
                                        <span className="flex justify-center  items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                            <PhotoIcon className="w-8 h-8" />
                                        </span>
                                    )}
                                    <button
                                        type="button"
                                        className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <input
                                            type="file"
                                            className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                                            onChange={onImageChoose}
                                        />
                                        Change
                                    </button>
                                </div>
                            </div>
                            {/*Image*/}

                            {/*Title*/}
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Survey Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={survey.title}
                                    onChange={(ev) =>
                                        setSurvey({
                                            ...survey,
                                            title: ev.target.value,
                                        })
                                    }
                                    placeholder="Survey Title"
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                        errorTitle ? "border-red-500" : ""
                                    }`}
                                />
                                {errorTitle && (
                                    <small className="text-red-500">
                                        {errorTitle}
                                    </small>
                                )}
                            </div>
                            {/*Title*/}

                            {/*Description*/}
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Description
                                </label>
                                {/* <pre>{ JSON.stringify(survey, undefined, 2) }</pre> */}
                                {}
                                <textarea
                                    name="description"
                                    id="description"
                                    value={survey.description || ""}
                                    onChange={(ev) =>
                                        setSurvey({
                                            ...survey,
                                            description: ev.target.value,
                                        })
                                    }
                                    placeholder="Describe your survey"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                ></textarea>
                            </div>
                            {/*Description*/}

                            {/*Expire Date*/}
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="expire_date"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Expire Date
                                </label>
                                <input
                                    type="date"
                                    name="expire_date"
                                    id="expire_date"
                                    value={survey.expire_date}
                                    onChange={(ev) =>
                                        setSurvey({
                                            ...survey,
                                            expire_date: ev.target.value,
                                        })
                                    }
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                        errorExpireDate ? "border-red-500" : ""
                                    }`}
                                />
                                {errorExpireDate && (
                                    <small className="text-red-500">
                                        {errorExpireDate}
                                    </small>
                                )}
                            </div>
                            {/*Expire Date*/}

                            {/*Active*/}
                            <div className="flex items-start">
                                <div className="flex h-5 items-center">
                                    <input
                                        id="status"
                                        name="status"
                                        type="checkbox"
                                        checked={survey.status}
                                        onChange={(ev) =>
                                            setSurvey({
                                                ...survey,
                                                status: ev.target.checked,
                                            })
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="comments"
                                        className="font-medium text-gray-700"
                                    >
                                        Active
                                    </label>
                                    <p className="text-gray-500">
                                        Whether to make survey publicly
                                        available
                                    </p>
                                </div>
                            </div>
                            {/*Active*/}

                            {/* Survey Questions */}
                            <button
                                type="button"
                                onClick={addQuestion}
                                className="flex bg-gray-600 hover:bg-gray-700 items-center text-sm py-1 px-4 rounded-sm text-white"
                            >
                                Add question (SurveyView) without fetch
                            </button>
                            <SurveyQuestions
                                questions={survey.questions}
                                onQuestionsUpdate={onQuestionsUpdate}
                            />
                            {/* Survey Questions */}
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <TButton>Save</TButton>
                        </div>
                        {/* <p>Survey(SurveyView): {JSON.stringify(survey)}</p> */}
                    </div>
                </form>
            )}
            {loading && (
                <div className="flex justify-center items-center">
                    <div
                        className="text-purple-500 spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                        role="status"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </PageComponent>
    );
}
