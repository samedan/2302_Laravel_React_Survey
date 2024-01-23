import React from "react";
import TButton from "./core/TButton";
import {
    ArrowTopRightOnSquareIcon,
    PencilIcon,
    TrashIcon,
    ArrowRightCircleIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function SurveyListItemPublic({
    survey,
    inactive,
    continuedSurvey,
}) {
    console.log(survey);
    return (
        <>
            <Link to={`/survey/public/${survey.slug}`}>
                <div className="flex flex-col py-1 px-6 shadow-md bg-white hover:bg-gray-50 h-[13rem]">
                    {/* Image Loading from SurveyListItemPublic */}
                    {continuedSurvey && (
                        <div
                            style={{
                                maxWidth: "287px",
                                maxHeight: "152px",
                            }}
                        >
                            <img
                                // src={survey.image_url}
                                src={
                                    import.meta.env.VITE_API_BASE_URL +
                                    "/" +
                                    survey.image
                                }
                                alt={survey.title}
                                className="w-full_ h-48_ object-cover"
                                style={{
                                    maxWidth: "287px",
                                    maxHeight: "152px",
                                }}
                            />
                            {inactive === false && (
                                <div
                                    className="text-block text-xl bg-green-700"
                                    style={{
                                        position: "relative",
                                        top: "-60px",
                                        // right: "20px",

                                        color: "white",
                                        paddingLeft: "20px",
                                        paddingRight: "20px",
                                    }}
                                >
                                    {/* <h4>INACTIVE</h4> */}
                                    <h4>{survey.title}</h4>
                                </div>
                            )}
                        </div>
                    )}
                    {!continuedSurvey && (
                        <div
                            style={{
                                maxWidth: "287px",
                                maxHeight: "152px",
                            }}
                        >
                            <img
                                src={survey.image_url}
                                alt={survey.title}
                                className="w-full_ h-48_ object-cover"
                                style={{
                                    maxWidth: "287px",
                                    maxHeight: "152px",
                                }}
                            />

                            {inactive === false && (
                                <div
                                    className="text-block text-xl bg-green-700"
                                    style={{
                                        position: "relative",
                                        top: "-60px",
                                        // right: "20px",

                                        color: "white",
                                        paddingLeft: "20px",
                                        paddingRight: "20px",
                                    }}
                                >
                                    {/* <h4>INACTIVE</h4> */}
                                    <h4>{survey.title}</h4>
                                </div>
                            )}
                        </div>
                    )}
                    {/* END Image Loading from SurveyListItemPublic */}

                    {/* <h4 className="mt-4 text-lg font-bold min-h-[60px]">
                        {survey.title}
                    </h4> */}

                    {/* <TButton
                        color="green"
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        style={{ maxWidth: "120px" }}
                    > */}
                    {/* <PlusCircleIcon className="h-6 w-6 mr-2" /> */}
                    {/* <span className="text-lg">Commencez</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pl-3">
                            <ArrowRightCircleIcon className="h-6 w-6 text-white-500 group-hover:text-white-400" />
                        </span> */}
                    {/* <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </span>
                        Commencer
                    </TButton> */}

                    <div
                        style={{
                            position: "relative",
                            bottom: "-2px",
                            // right: "20px",

                            color: "white",
                            paddingLeft: "20px",
                            paddingRight: "20px",
                        }}
                    >
                        <button
                            // type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-700 py-2 px-4 font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-lg"
                        >
                            <span class="absolute inset-y-0 right-0 flex items-center pr-3">
                                <ArrowRightCircleIcon className="h-6 w-6 text-white-500 group-hover:text-white-400" />
                            </span>
                            Commencer
                        </button>
                    </div>

                    {/* <strong>Description:</strong>
                <div
                    dangerouslySetInnerHTML={{ __html: survey.description }}
                    className="overflow-hidden flex-1"
                ></div>
                Conseils:
                <div
                    dangerouslySetInnerHTML={{ __html: survey.conseils }}
                    className="overflow-hidden flex-1"
                ></div> */}
                    {/* {survey.questions.length !== 0 && (
                    <div>
                        <span className=" h-20 w-20 items-center justify-center text-white rounded-full bg-green-600 border-1 p-2">
                            {survey.questions.length}
                        </span>{" "}
                        Question(s) in the survey
                    </div>
                )} */}
                    {/* <div className="flex justify-between items-center mt-3">
                    <TButton to={`/surveys/${survey.id}`}>
                        <PencilIcon className="w-5 h-5 mr-2 " />
                        Edit
                    </TButton>
                    <div className="flex items-center">
                        <TButton
                            href={`/survey/public/${survey.slug}`}
                            circle
                            link
                        >
                            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                        </TButton>

                        {survey.id && (
                            <TButton
                                onClick={(ev) => onDeleteClick(survey.id)}
                                circle
                                link
                                color="red"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </TButton>
                        )}
                    </div>
                </div> */}
                </div>
            </Link>
        </>
    );
}
