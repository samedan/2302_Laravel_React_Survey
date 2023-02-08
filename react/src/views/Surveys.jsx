import React from "react";
import PageComponent from "../components/PageComponent";
import SurveyListItem from "../components/SurveyListItem";
import { useStateContext } from "../contexts/ContextProvider";

export default function Surveys() {
    // const state = useStateContext();
    const { surveys } = useStateContext();

    console.log(surveys);

    const onDeleteClick = () => {
        console.log("OnCDeleteClick");
    };

    return (
        <PageComponent title="Surveys">
            {/* <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                    {surveys.map((survey) => {
                        console.log(survey);
                        return (
                            <SurveyListItem survey={survey} key={survey.id} />
                        );
                    })}
                </div> */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {surveys.map((survey) => (
                    <SurveyListItem
                        survey={survey}
                        key={survey.id}
                        onDeleteClick={onDeleteClick}
                    />
                ))}
            </div>
        </PageComponent>
    );
}
