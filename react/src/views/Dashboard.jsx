import React, { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import DashboardCard from "../components/DashboardCard";
import TButton from "../components/core/TButton";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import axiosClient from "./../axios";
import Answers from "./Answers";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/dashboard")
            .then((res) => {
                setLoading(false);
                console.log("latestAnswers");
                console.log(res.data.latestAnswers);
                setData(res.data);
                return res;
            })
            .catch((error) => {
                setLoading(false);
                return error;
            });
    }, []);
    return (
        <PageComponent title="Dashboard">
            {loading && <div className="flex justify-center">Loading...</div>}
            {!loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">
                    <DashboardCard
                        title="Total Surveys"
                        className="order-1 lg:order-2"
                        style={{ animationDelay: "0.1s" }}
                    >
                        <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
                            {data.totalSurveys}
                        </div>
                    </DashboardCard>

                    <DashboardCard
                        title="Total Answers"
                        className="order-2 lg:order-4"
                        style={{ animationDelay: "0.2s" }}
                    >
                        {" "}
                        <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
                            {data.totalAnswers}
                        </div>
                    </DashboardCard>

                    <DashboardCard
                        title="Latest Survey"
                        className="order-3 lg:order-1 row-span-2"
                        style={{ animationDelay: "0.2s" }}
                    >
                        {data.latestSurvey && (
                            <div>
                                <img
                                    src={data.latestSurvey.image_url}
                                    className="w-[240px] mx-auto"
                                />
                                <h3 className="font-bold text-xl mb-3">
                                    {data.latestSurvey.title}
                                </h3>
                                <div className="flex justify-between text-sm mb-1">
                                    <div>Create Date:</div>
                                    <div>{data.latestSurvey.created_at}</div>
                                </div>
                                <div className="flex justify-between text-sm mb-1">
                                    <div>Expire Date:</div>
                                    <div>{data.latestSurvey.expire_date}</div>
                                </div>
                                <div className="flex justify-between text-sm mb-1">
                                    <div>Status:</div>
                                    <div>
                                        {data.latestSurvey.status
                                            ? "Active"
                                            : "Draft"}
                                    </div>
                                </div>
                                <div className="flex justify-between text-sm mb-1">
                                    <div>Questions:</div>
                                    <div>{data.latestSurvey.questions}</div>
                                </div>
                                <div className="flex justify-between text-sm mb-1">
                                    <div>Answers:</div>
                                    <div>{data.latestSurvey.answers}</div>
                                </div>
                                {/* Buttons */}
                                <div className="flex justify-between">
                                    <TButton
                                        to={`/surveys/${data.latestSurvey.id}`}
                                    >
                                        <PencilIcon className="w-5 h-5 mr-2" />
                                        Edit survey
                                    </TButton>
                                    <TButton>
                                        <EyeIcon className="w-5 h-5 mr-2" />
                                        View answers
                                    </TButton>
                                </div>
                            </div>
                        )}
                        {!data.latestSurvey && (
                            <div className="text-gray-600 text-center py-16">
                                You don't have surveys yet
                            </div>
                        )}
                    </DashboardCard>

                    <DashboardCard
                        title="Latest Answers"
                        className="order-4 lg:order-2 row-span-2"
                        style={{ animationDelay: "0.3s" }}
                    >
                        {data.latestAnswers.length && (
                            <div className="text-left">
                                {/* ANSWERS */}
                                {data.latestAnswers.map((answer) => (
                                    <>
                                        <Link
                                            to={`/answers/${answer.id}`}
                                            // state={{ answer: "occupation" }}
                                            // state={{ from: "occupation" }}
                                            state={answer}
                                            key={answer.id}
                                            answer={answer}
                                            className="block p-2 hover:bg-gray-100/90"
                                        >
                                            <div className="font-semibold">
                                                {answer.survey.title}
                                            </div>
                                            <small>
                                                Answer Made at :{" "}
                                                <i className="font-semibold">
                                                    {answer.end_date}
                                                </i>
                                            </small>
                                        </Link>
                                        {/* <Link
                                            to={`/answers/${answer.id}`}
                                            // state={{ answer: "occupation" }}
                                            // state={{ from: "occupation" }}
                                            state={answer}
                                        >
                                            <p>Click {answer.id}</p>
                                        </Link> */}
                                        {/* <TButton
                                            to={`/answers/${answer.id}`}
                                            onClick={(answer) => (
                                                <Answers
                                                    answer={"answer"}
                                                    id={"answer.id"}
                                                />
                                            )}
                                            key={answer.id}
                                        ></TButton> */}
                                        {/* Answer: {answer.id} */}
                                    </>
                                ))}
                            </div>
                        )}
                        {!data.latestAnswers.length && (
                            <div className="text-gray-600 text-center py-16">
                                You don't have answers yet
                            </div>
                        )}
                    </DashboardCard>
                </div>
            )}
        </PageComponent>
    );
}
