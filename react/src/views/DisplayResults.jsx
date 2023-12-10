import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "./../axios";
import { stringify } from "uuid";

export default function DisplayResults() {
    const { setCurrentUser, setUserToken } = useStateContext();
    const { currentPatient, setCurrentPatient } = useStateContext();
    const [email, setEmail] = useState("");
    // const [user, setUser] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [other, setOther] = useState("");
    const [results, setResults] = useState();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ __html: "" });

    const { user } = useParams();

    useEffect(() => {
        setLoading(true);
        getPrestashop();
        // if (user) {
        //     axiosClient
        //         .get(`patientData?user=${user}`)

        //         .then(({ data }) => {
        //             setLoading(false);
        //             // setSurvey(data.data);
        //             console.log("data.data");
        //             console.log(data);
        //         })
        //         .catch(() => {
        //             setLoading(false);
        //         });
        // } else {
        //     {
        //         if (currentPatient.other !== undefined) {
        //             console.log("here");
        //             axiosClient
        //                 .get(`available/surveys?user=${currentPatient.other}`)
        //                 .then(({ data }) => {
        //                     setLoading(false);
        //                     // setSurvey(data.data);
        //                     console.log(data.data);
        //                     setResults(data);
        //                 })
        //                 .catch(() => {
        //                     setLoading(false);
        //                 });
        //         }
        //         // testing
        //         else {
        //             axiosClient
        //                 .get(`available/surveys?user=123456`)
        //                 .then(({ data }) => {
        //                     setLoading(false);
        //                     // setSurvey(data.data);
        //                     console.log(data);
        //                     setResults(data);
        //                 })
        //                 .catch(() => {
        //                     setLoading(false);
        //                 });
        //             // end testing
        //         }
        //     }
        // }
    }, []);

    function getUser() {
        const { user } = useParams();

        console.log(user);
        debugger;
        return user;
    }

    function getPrestashop() {
        fetch(
            // "https://H8MU9WC4GQRDWKAFQ23WRY1HA4CQSBRD@shop.pharmacie-en-couleurs-eragny.com/api/products/&filter[reference]=[3532678600406]?display=full",
            "https://shop.pharmacie-en-couleurs-eragny.com/api/products/&filter[reference]=[3401547819976]?display=full&output_format=JSON",
            {
                headers: {
                    Authorization:
                        "BASIC SDhNVTlXQzRHUVJEV0tBRlEyM1dSWTFIQTRDUVNCUkQ=",
                },
            }
        )
            // .then((response) => response.JSON())
            .then((response) => response.json())
            // .then((data) => console.log(data.products[0]))
            .then((data) => setProduct(data.products[0]));
        // .then(
        //     console.log(
        //         `https://shop.pharmacie-en-couleurs-eragny.com/${data.products[0].images[0].id}-medium_default/${data.products[0].link_rewrite}.jpg`
        //     )

        // .then(setProduct())
        // .then((text) => console.log(text));
        // axiosClient
        //     .get(
        //         `H8MU9WC4GQRDWKAFQ23WRY1HA4CQSBRD@shop.pharmacie-en-couleurs-eragny.com/api/products/&filter[reference]=[3401547819976]?display=full`
        //     )
        //     .then(({ data }) => {
        //         setLoading(false);
        //         // setSurvey(data.data);
        //         console.log("prestashop_data");
        //         console.log(data);
        //         // setResults(data);
        //     })
        //     .catch(() => {
        //         setLoading(false);
        //     });
        // const image = document.getElementById("js-product-list").outerHTML;
        // console.log(image);

        // return <div className="App">{image}</div>;
    }

    return (
        <>
            <div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Résultats :
                </h2>
            </div>
            {currentPatient && (
                <>
                    <p>User: {currentPatient.user}</p>
                    <p>Age: {currentPatient.age}</p>
                    <p>Weight: {currentPatient.weight}</p>
                    <p>Height: {currentPatient.height}</p>
                    <p>Other: {currentPatient.other}</p>
                </>
            )}

            {product && (
                <div>
                    {
                        <img
                            src={`https://shop.pharmacie-en-couleurs-eragny.com/${product.associations.images[0].id}-medium_default/${product.link_rewrite}.jpg`}
                        />
                    }{" "}
                    {<>Description: {product.description_short}</>}
                    <br />
                    <p>{product.link_rewrite}</p>
                </div>
            )}

            {/* {results && <p>{JSON.stringify(results, null, 2)}</p>} */}
            {/* <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <Link
                    to="/signup"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                    Signup for free
                </Link>
            </p> */}

            {results !== undefined &&
                results.totalSurveys &&
                results.totalSurveys.map((survey) => (
                    <>
                        <h2
                            key={survey.id}
                            className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
                        >
                            <img
                                src={
                                    import.meta.env.VITE_API_BASE_URL +
                                    "/" +
                                    survey.image
                                }
                                width={100}
                            />{" "}
                            {survey.title}
                        </h2>
                        {results.totalQuestions.map((question) => (
                            <>
                                {/* if question was answered */}
                                {/* results.answersByUser.map(answerByUser => ) */}
                                {question.survey_id === survey.id && (
                                    <>
                                        {results.answersByUser.map((answer) => (
                                            <p key={answer.id}>
                                                {question.id ===
                                                    answer.survey_question_id && (
                                                    <>
                                                        <p>
                                                            {"Question : " +
                                                                question.question}
                                                        </p>

                                                        <p>
                                                            {"Conseils : " +
                                                                question.conseils}
                                                        </p>

                                                        <p>
                                                            {"Description : " +
                                                                question.description}
                                                        </p>
                                                        <p>
                                                            <img src="https://shop.pharmacie-en-couleurs-eragny.com/36-small_default/forcapil-shampoing-fortifiant.jpg" />
                                                        </p>
                                                    </>
                                                )}
                                            </p>
                                        ))}
                                    </>
                                )}
                            </>
                        ))}
                    </>
                ))}
            {error.__html && (
                <div
                    className="bg-red-500 rounded py-2 px-3 text-white"
                    dangerouslySetInnerHTML={error}
                ></div>
            )}
        </>
    );
}
