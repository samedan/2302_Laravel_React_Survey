import { LockClosedIcon } from "@heroicons/react/20/solid";

import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "./../axios";
import Modal from "react-modal";
import "tw-elements"; // Loading CSS
// import SurveyListItem from "../components/SurveyListItem";
import PageComponent from "../components/PageComponent";
import DashboardCard from "../components/DashboardCard";

import emailjs from "@emailjs/browser";

import QuestionWithAnswers from "./QuestionWithAnswers";
import TButton from "../components/core/TButton";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { useIdleTimer } from "react-idle-timer";

export default function DisplayResultsEmail() {
    const { setCurrentUser, setUserToken } = useStateContext();
    const { currentPatient, setCurrentPatient } = useStateContext();
    const [email, setEmail] = useState("");
    // const [user, setUser] = useState("");
    const navigate = useNavigate();
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [other, setOther] = useState("");
    const [results, setResults] = useState();
    const [surveyArrayResults, setSurveyArrayResults] = useState([]);
    const [answers, setAnswers] = useState();
    const [questions, setQuestions] = useState();

    const [surveys, setSurveys] = useState();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ __html: "" });

    const { user } = useParams();

    console.log("user");
    console.log(user);
    // useEffect(() => {
    //     setProduct();
    // }, [translateIntoNumbers]);

    useEffect(() => {
        setLoading(true);
        // const { user } = useParams();
        // getPrestashop();
        if (user) {
            axiosClient
                .get(`patientData?user=${user}`)
                .then(({ data }) => {
                    setLoading(false);
                    // setSurvey(data.data);
                    // console.log("data.data");
                    // console.log(data);
                    // console.log(data.patientData[0]);
                    setCurrentPatient(data.patientData[0]);
                    setUserEdited(data.patientData[0].user);
                    setEmailEdited(data.patientData[0].weight);
                    setAgeEdited(data.patientData[0].age);
                    setAnswers(data.patientDataAnswers);
                    // console.log("answers");
                    // console.log(answers);
                    setQuestions(data.patientQuestionsAnswered);
                    // console.log("questions");
                    // console.log(questions);
                    setSurveys(data.totalSurveys);
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            {
                if (currentPatient.other !== undefined) {
                    console.log("here");
                    axiosClient
                        .get(`available/surveys?user=${currentPatient.other}`)
                        .then(({ data }) => {
                            setLoading(false);
                            // setSurvey(data.data);
                            console.log(data.data);
                            setResults(data);
                        })
                        .catch(() => {
                            setLoading(false);
                        });
                }
                // testing
                else {
                    axiosClient
                        .get(`available/surveys?user=${user}`)
                        .then(({ data }) => {
                            setLoading(false);
                            // setSurvey(data.data);
                            console.log(data);
                            setResults(data);
                        })
                        .catch(() => {
                            setLoading(false);
                        });
                    // end testing
                }
            }
        }
    }, []);

    function getUser() {
        const { user } = useParams();
        console.log(user);
        return user;
    }

    function fetchQuestion(question) {
        questions &&
            questions.map((q) => {
                if (q.id === question) {
                    return "xor";
                }
            });

        // questions.map((question) => {
        //     if (questionId === question.id) {
        //         console.log(question.question);
        //         return <p>{question.question}</p>;
        //     }
        // });
    }

    let finalArray = [];
    function translateIntoNumbers(desc, question, survey) {
        let numberedMeds;
        // console.log(`desc before counting ` + survey);
        // console.log(desc);

        numberedMeds = desc.split(",");
        let resultsWithoutSpaces;
        resultsWithoutSpaces = numberedMeds.map((el) => {
            return el.trim();
        });
        let productsArray = [survey, question];
        resultsWithoutSpaces.map((res) => {
            if (!productsArray.includes(res) && !finalArray.includes(res)) {
                productsArray.push(res);
            }

            // return getPrestashop(res);
        });
        console.log(productsArray);

        // productsArray.map((p) => getPrestashop(p));

        // console.log("after counting");
        // console.log(resultsWithoutSpaces);
    }

    function translateIntoArray(desc, question, survey) {
        let numberedMeds;
        let numberedMedsWithSurvey = [survey, question];
        numberedMeds = desc.split(",");
        let resultsArrayWithoutSpaces;
        let resultsArrayWithoutSpacesWithQandS;

        resultsArrayWithoutSpaces = numberedMeds.map((el) => {
            return el.trim();
        });

        // ["survey", "question", "1", "2"..]
        resultsArrayWithoutSpaces.map((res) => {
            if (
                !numberedMedsWithSurvey.includes(res) &&
                !finalArray.includes(res)
            ) {
                numberedMedsWithSurvey.push(res);
            }
        });

        // console.log(numberedMedsWithSurvey);

        // console.log(resultsArrayWithoutSpaces);
        // return resultsArrayWithoutSpaces; // only numbers
        return numberedMedsWithSurvey; // onlt numbers
    }

    function envoyerEmail(email, codeOther) {
        console.log("email", email);
        console.log("other", other);
    }

    // Send EMAIL
    // const form = useRef();
    const [userEdited, setUserEdited] = useState(user.user);
    const [ageEdited, setAgeEdited] = useState(user.user);
    const [emailEdited, setEmailEdited] = useState(user.user);
    const [emailSent, setEmailSent] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        console.log(form.current);
    };
    // END Send EMAIL

    const navigateToNewPage = () => {
        // use the navigate function to navigate to /new-page
        navigate("/");
    };

    return (
        <PageComponent
            id="yourAppElement"
            title="Merci pour votre participation. Voici vos résultats : "
            buttons={
                <TButton
                    color="green"
                    onClick={() => navigateToNewPage()}
                    // onClick={goHome}
                    className="w-60 flex justify-center rounded-md border 
                    border-transparent bg-indigo-600 py-4 px-4  font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  text-lg"
                >
                    <span className="text-xl">Nouveau Bilan Santé ?</span>
                    <ExclamationTriangleIcon className="h-6 w-6 ml-2" />
                </TButton>
            }
            // image={logo}
        >
            {/* User DATA */}
            <div>
                <p className="text-xl text-red-500">
                    {/* {currentPatient && (
                        <PatientDataFinal currentPatient={currentPatient} />
                    )} */}
                    Cette enquête ne constitue en aucun cas un examen médical et
                    ne remplace pas l'avis du médecin. Veuillez demander plus
                    d’informations à votre pharmacien.
                    {/* <Form
                        currentPatient={currentPatient}
                        // recipientEmail={currentPatient.weight}
                        // code={currentPatient.other}
                    /> */}
                </p>
            </div>
            {/* END User DATA */}

            {/* TIMER */}
            {/* <div> */}
            {/* <p>Current State: {state}</p> */}
            {/* <p>Action Events: {count}</p> */}
            {/* <p>{remaining} seconds remaining</p> */}
            {/* </div> */}
            {/* END TIMER */}

            {/* {currentPatient && (
                <>
                    <p>User: {currentPatient.user}</p>
                    <p>Age: {currentPatient.age}</p>
                    <p>Weight: {currentPatient.weight}</p>
                    <p>Height: {currentPatient.height}</p>
                    <p>Other: {currentPatient.other}</p>
                </>
            )} */}

            {answers && (
                <>
                    {/* <p>///////////////////////////////</p> */}
                    {/* <ul>Surveys: </ul> */}
                    {surveys.map((s) => (
                        <>
                            <DashboardCard
                                // title={s.title}
                                className={`order-4 lg:order-2 row-span-2 mb-2 survey${s.id}`}
                                style={{ animationDelay: "0.3s" }}
                            >
                                {/* <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]"> */}

                                <div className="flex flex-row py-4 px-6 shadow-md bg-white hover:bg-gray-50">
                                    <img
                                        src={
                                            import.meta.env.VITE_API_BASE_URL +
                                            "/" +
                                            s.image
                                        }
                                        alt={s.title}
                                        className="h-28 object-cover mr-10"
                                    />
                                    <div className="">
                                        <p>
                                            Voici nos conseils sur le sujet :{" "}
                                        </p>
                                        <h3 className="text-2xl font-semibold">
                                            {s.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Questions & Conseils */}
                                <div>
                                    <ul>
                                        {answers.map((answer) => (
                                            <li>
                                                {/* <h2>Question answered: </h2> */}
                                                <div>
                                                    {questions.map(
                                                        (q) =>
                                                            q.id ===
                                                                answer.survey_question_id &&
                                                            q.survey_id ==
                                                                s.id && (
                                                                <DashboardCard
                                                                    // title={s.title}
                                                                    className="order-4 lg:order-2 row-span-2 mb-10 bg-slate-100"
                                                                    style={{
                                                                        animationDelay:
                                                                            "0.3s",
                                                                    }}
                                                                >
                                                                    <ul className="text-left">
                                                                        {/* <li>
                                                                    <strong>
                                                                        SurveyID{" "}
                                                                    </strong>
                                                                    {
                                                                        q.survey_id
                                                                    }
                                                                </li> */}
                                                                        <li>
                                                                            <h2 className="text-2xl">
                                                                                {/* Question
                                                                                :{" "} */}
                                                                                <span className="text-green-600 font-bold">
                                                                                    {
                                                                                        q.question
                                                                                    }
                                                                                </span>
                                                                            </h2>
                                                                        </li>
                                                                        <li>
                                                                            {/* Products code */}
                                                                            {/* <strong>
                                                                                Products{" "}
                                                                            </strong>
                                                                            {
                                                                                q.description
                                                                            } */}
                                                                            {/* END Products code */}

                                                                            {q.description !=
                                                                                [] && (
                                                                                <>
                                                                                    <h2
                                                                                        // style={{
                                                                                        //     color: "black",
                                                                                        // }}
                                                                                        className="text-sky-500"
                                                                                    >
                                                                                        Vous
                                                                                        avez
                                                                                        une
                                                                                        carence
                                                                                        en
                                                                                        :{" "}
                                                                                        <span className="font-bold">
                                                                                            {" "}
                                                                                            {
                                                                                                q.conseils
                                                                                            }
                                                                                        </span>
                                                                                    </h2>
                                                                                    <p className="text-left">
                                                                                        Nous
                                                                                        vous
                                                                                        recommandons
                                                                                        :{" "}
                                                                                    </p>
                                                                                    <h3>
                                                                                        {" "}
                                                                                        <QuestionWithAnswers
                                                                                            code={translateIntoArray(
                                                                                                q.description,
                                                                                                q.question,
                                                                                                s.title
                                                                                            )}
                                                                                            question={
                                                                                                q.question
                                                                                            }
                                                                                            survey={
                                                                                                s.title
                                                                                            }
                                                                                            classSurvey={
                                                                                                q.survey_id
                                                                                            }
                                                                                        />
                                                                                        {/* {translateIntoNumbers(
                                                                                        q.description,
                                                                                        q.question,
                                                                                        s.title
                                                                                    )} */}
                                                                                    </h3>
                                                                                </>
                                                                            )}
                                                                        </li>
                                                                        {/* <li>
                                                                            <strong>
                                                                                Conseils{" "}
                                                                            </strong>
                                                                            {
                                                                                q.conseils
                                                                            }
                                                                        </li> */}
                                                                    </ul>
                                                                </DashboardCard>
                                                            )
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* END Questions & Conseils */}
                            </DashboardCard>
                        </>
                    ))}
                </>
            )}

            {/* Category Image */}
            {/* {product && (
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
            )} */}
            {/* End Category Image */}

            {results && <p>{JSON.stringify(results, null, 2)}</p>}
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
        </PageComponent>
    );
}
