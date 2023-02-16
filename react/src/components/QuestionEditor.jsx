import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";

export default function QuestionEditor({
    index = 0,
    question,
    addQuestion,
    deleteQuestion,
    questionChange,
}) {
    const [model, setModel] = useState({ ...question });
    const { questionTypes } = useStateContext(); // "text", "select", "radio", "checkbox", "textarea",

    useEffect(() => {
        questionChange(model);
    }, [model]);

    function upperCaseFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <>
            <div className="bg-gray-100 p-5 mb-4 rounded border">
                <div className="flex justify-between mb-3">
                    <h4>
                        {index + 1}.{model.question}
                    </h4>
                    {/* Buttons */}
                    <div className="flex items-center">
                        <button
                            type="button"
                            className="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                            onClick={() => addQuestion(index + 1)}
                        >
                            <PlusIcon className="w-4" />
                            Add
                        </button>
                        <button
                            type="button"
                            className="flex items-center text-xs py-1 px-3 mr-2 rounded-sm border border-transparent text-red-500 hover:border-red-600 font-semibold"
                            onClick={() => deleteQuestion(question)}
                        >
                            <TrashIcon className="w-4" />
                            Delete
                        </button>
                    </div>
                    {/* Buttons */}
                </div>

                <div className="flex gap-3 justify-between mb-3 shadow-lg">
                    {/* Question text */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Question
                        </label>
                        <input
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            type="text"
                            name="question"
                            id="question"
                            value={model.question}
                            onChange={(ev) =>
                                setModel({
                                    ...model,
                                    question: ev.target.value,
                                })
                            }
                        />
                    </div>
                    {/* Question text */}

                    {/* Question type */}
                    <div>
                        <label
                            htmlFor="questionType"
                            className="block text-sm font-medium text-gray-700 w-40"
                        >
                            Question type
                        </label>
                        <select
                            name="questionType"
                            id="questionType"
                            className="my-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500
                     focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            onChange={(ev) =>
                                setModel({
                                    ...model,
                                    type: ev.target.value,
                                })
                            }
                        >
                            {questionTypes.map((type) => (
                                <option
                                    value={type}
                                    key={type}
                                    // selected={model.type == type}
                                    defaultValue={model.type == type}
                                >
                                    {upperCaseFirst(type)}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Question type */}
                </div>

                <div className="mb-3">
                    {/* Description */}
                    <div>
                        <label
                            htmlFor="questionDescription"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            name="questionDescription"
                            id="questionDescription"
                            value={model.description || ""}
                            onChange={(ev) =>
                                setModel({
                                    ...model,
                                    description: ev.target.value,
                                })
                            }
                            className="my-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500
                 focus:ring-indigo-500 sm:text-sm"
                        ></textarea>
                    </div>
                    {/* Description */}
                </div>
            </div>
        </>
    );
}
