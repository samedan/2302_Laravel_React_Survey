import React from "react";
import TButton from "./core/TButton";
import {
    ArrowTopRightOnSquareIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

export default function SurveyListItem({
    survey,
    onDeleteClick,
    inactive,
    order,
}) {
    return (
        <>
            <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
                <p>Order: {order}</p>
                <img
                    src={survey.image_url}
                    alt={survey.title}
                    className="w-full h-48 object-cover"
                />
                {inactive && (
                    <div
                        class="text-block"
                        style={{
                            bottom: "20px",
                            right: "20px",
                            backgroundColor: "red",
                            color: "white",
                            paddingLeft: "20px",
                            paddingRight: "20px",
                        }}
                    >
                        <h4>INACTIVE</h4>
                    </div>
                )}
                <h4 className="mt-4 text-lg font-bold">{survey.title}</h4>
                <strong>Description:</strong>
                <div
                    dangerouslySetInnerHTML={{ __html: survey.description }}
                    className="overflow-hidden flex-1"
                ></div>
                Conseils:
                <div
                    dangerouslySetInnerHTML={{ __html: survey.conseils }}
                    className="overflow-hidden flex-1"
                ></div>
                {survey.questions.length !== 0 && (
                    <div>
                        <span className=" h-20 w-20 items-center justify-center text-white rounded-full bg-green-600 border-1 p-2">
                            {survey.questions.length}
                        </span>{" "}
                        Question(s) in the survey
                    </div>
                )}
                <div className="flex justify-between items-center mt-3">
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
                </div>
            </div>
        </>
    );
}
