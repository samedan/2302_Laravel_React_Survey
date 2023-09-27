import React, { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Answers() {
    // const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    // const { id } = useParams();

    // console.log(id);

    const location = useLocation();
    // const { answer } = location.state;
    const { id, survey, end_date } = location.state;
    console.log(id);
    console.log(survey);
    console.log(end_date);
    // console.log(id);

    // useEffect(() => {
    //     setLoading(true);
    //     axiosClient
    //         .get("/dashboard")
    //         .then((res) => {
    //             setLoading(false);
    //             console.log(res.data);
    //             setData(res.data);
    //             return res;
    //         })
    //         .catch((error) => {
    //             setLoading(false);
    //             return error;
    //         });
    // }, []);
    return (
        <PageComponent title="Answers">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">
                answers
            </div>
        </PageComponent>
    );
}
