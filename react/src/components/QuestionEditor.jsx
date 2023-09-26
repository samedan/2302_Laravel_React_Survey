import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { v4 as uuidv4 } from "uuid";

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

    function shouldHaveOptions(type = null) {
        type = type || model.type;
        return ["select", "radio", "checkbox"].includes(type); // return true
    }

    function onTypeChange(ev) {
        const newModel = {
            ...model,
            type: ev.target.value,
        };
        // if previous type aldready has Options
        // debugger;
        console.log(model.type);
        if (
            // the old type should not have options
            !shouldHaveOptions(model.type) &&
            // new type should have options
            shouldHaveOptions(ev.target.value)
        ) {
            if (!model.data.options) {
                // only write new options if Old options do not exist
                newModel.data = {
                    options: [{ uuid: uuidv4(), text: "" }],
                };
            }
        } else if (
            // the old type should have options
            shouldHaveOptions(model.type) &&
            // new type should not have options
            !shouldHaveOptions(ev.target.value)
        ) {
            newModel.data = {};
        }
        setModel(newModel);
    }

    function addOption() {
        model.data.options.push({
            uuid: uuidv4(),
            text: "",
        });
        setModel({ ...model });
    }

    function deleteOption(op) {
        model.data.options = model.data.options.filter(
            (option) => option.uuid !== op.uuid
        );
        setModel({ ...model });
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
                            onChange={onTypeChange}
                            value={model.type}
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

                {/* Select Options */}
                {/* {<div>Type chosen: {JSON.stringify(model)}</div>} */}
                {shouldHaveOptions() && (
                    <div className="p-5 bg-white border-spacing-1 border-4 border-dashed border-rose-200">
                        <h4 className="text-sm font-semibold mb-1 flex justify-between items-center text-green-700">
                            Options
                            <button
                                onClick={addOption}
                                type="button"
                                className="items-center text-xs py-1 px-2 rounded-sm text-white bg-green-600 hover:bg-green-700"
                            >
                                Add option
                            </button>
                        </h4>
                        {model.data.options.length === 0 && (
                            <div className="text-xs text-gray-600 text-center py-3">
                                You don't have options defined
                            </div>
                        )}
                        {model.data.options.length > 0 && (
                            <div>
                                {model.data.options.map((op, ind) => (
                                    <div
                                        key={op.uuid}
                                        className="flex items-center mb-1"
                                    >
                                        <span className="w-6 text-sm ">
                                            {ind + 1}.
                                        </span>
                                        <input
                                            className="w-full rounded-sm py-1 px-2 text-sm border border-gray-300 focus:border-indigo-500"
                                            type="text"
                                            value={op.text}
                                            onInput={(ev) => {
                                                op.text = ev.target.value;
                                                setModel({
                                                    ...model,
                                                }); // not perfect
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="h-6 w-6 rounded-full flex items-center justify-center border border-transparent transition-colors hover:border-red-100"
                                        >
                                            <TrashIcon
                                                onClick={(ev) =>
                                                    deleteOption(op)
                                                }
                                                className="w-3 h-3 text-red-500"
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Select Options */}

                <div className="mb-3 mt-4">
                    {/* Description */}
                    <div className="mb-3">
                        <label
                            htmlFor="questionDescription"
                            className="block text-sm font-medium text-yellow-700 "
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
                    {/* END Description */}
                </div>
                <div className="mb-3 mt-4">
                    {/* Conseils */}
                    <div className="mb-3">
                        <label
                            htmlFor="questionConseils"
                            className="block text-sm font-medium text-yellow-700 "
                        >
                            Conseils
                        </label>
                        <textarea
                            name="questionConseils"
                            id="questionConseils"
                            value={model.conseils || ""}
                            onChange={(ev) =>
                                setModel({
                                    ...model,
                                    conseils: ev.target.value,
                                })
                            }
                            className="my-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500
                 focus:ring-indigo-500 sm:text-sm"
                        ></textarea>
                    </div>
                    {/* EDN Conseils */}
                </div>
            </div>
        </>
    );
}
