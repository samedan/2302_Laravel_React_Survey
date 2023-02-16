import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import axiosClient from "../axios";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import PaginationLinks from "../components/PaginationLinks";
import SurveyListItem from "../components/SurveyListItem";
import "tw-elements";

export default function Surveys() {
    // const state = useStateContext();
    // const { surveys } = useStateContext();
    const [surveys, setSurveys] = useState([]);
    const [meta, setMeta] = useState({}); // for pagination
    const [loading, setLoading] = useState(false);

    console.log(surveys);

    const getSurveys = (url) => {
        url = url || "/survey"; // if first or previous/next pages survey?page=2
        setLoading(true);
        axiosClient.get(url).then(({ data }) => {
            setSurveys(data.data);
            setMeta(data.meta);
            setLoading(false);
        });
    };

    const onDeleteClick = () => {
        console.log("OnCDeleteClick");
    };

    const onPageClick = (link) => {
        getSurveys(link.url);
    };

    useEffect(() => {
        getSurveys();
    }, []);

    return (
        <PageComponent
            title="Surveys"
            buttons={
                <TButton color="green" to="/surveys/create">
                    <PlusCircleIcon className="h-6 w-6 mr-2" />
                    Create new
                </TButton>
            }
        >
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
            {!loading && (
                <>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                        {surveys.map((survey) => (
                            <SurveyListItem
                                survey={survey}
                                key={survey.id}
                                onDeleteClick={onDeleteClick}
                            />
                        ))}
                    </div>
                    {surveys.length > 0 && (
                        <PaginationLinks
                            meta={meta}
                            onPageClick={onPageClick}
                        />
                    )}
                </>
            )}
        </PageComponent>
    );
}
