import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import axios from "axios";
import PublicQuestionView from "../components/PublicQuestionView";
import GetPrestashop from "./GetPrestashop";

export default function QuestionWithAnswers({ survey, question, code }) {
    const answers = {};

    // const [survey, setSurvey] = useState({
    //     questions: [],
    // });
    const [loading, setLoading] = useState(false);
    const [productName, setProductName] = useState("");
    const { slug } = useParams();

    // useEffect(() => {
    //     setLoading(true);
    //     axiosClient
    //         .get(`survey/get-by-slug/${slug}`)
    //         .then(({ data }) => {
    //             setLoading(false);
    //             setSurvey(data.data);
    //         })
    //         .catch(() => {
    //             setLoading(false);
    //         });
    // }, []);

    // console.log(code);
    console.log(code);

    if (code[0] === survey && code[1] === question) {
        console.log("code");
        console.log(code);
        const filteredArr = code.filter(
            (el) => el !== survey && el !== question
        );
        console.log("filteredArr");
        console.log(filteredArr);
        return (
            <div>
                <h1>CHILD : {survey}</h1>
                <p>QUESTION : {question}</p>
                {/* <p>CODE : {code}</p> */}
                {filteredArr.map((indexProduct) =>
                    // <p>INDEX: {getPrestashop(indexProduct)}</p>
                    {
                        return (
                            <p>
                                <GetPrestashop indexProduct={indexProduct} />
                            </p>
                        );
                    }
                )}
            </div>
        );
    }
}
