import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "./../axios";

export default function SurveyPublicView() {
    const { slug } = useParams();

    const [survey, setSurvey] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axiosClient.get(`survey/get-by-slug/${slug}`).then(({ data }) => {
            setSurvey(data.data);
        });
    }, []);

    // return <div>{JSON.stringify(survey, undefined, 2)}</div>;
    return (
        <div>
            {loading && <div className="flex justify-center">Loading...</div>}
            {!loading && (
                <div>
                    <div>
                        <div>
                            <img src={survey.image_url} alt="" />
                        </div>
                        <div>
                            <h1>{survey.title}</h1>
                            <p>{survey.expire_date}</p>
                            <p>{survey.description}</p>
                        </div>
                    </div>

                    <div></div>
                </div>
            )}
        </div>
    );
}
