import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "./../axios";
import Modal from "react-modal";
import logo from "../assets/logo.png";
import "tw-elements"; // Loading CSS
// import SurveyListItem from "../components/SurveyListItem";
import PageComponent from "../components/PageComponent";
import DashboardCard from "../components/DashboardCard";

import emailjs from "@emailjs/browser";
import loadingGif from "../assets/loading.svg";
import TButton from "../components/core/TButton";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { useIdleTimer } from "react-idle-timer";

import ReactMarkdown from "react-markdown";

export default function DisplayResults() {
    // Modal
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
    // Modal.setAppElement("#yourAppElement");
    Modal.setAppElement(document.getElementById("yourAppElement"));
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
    }

    function closeModal() {
        setRemaining(50);
        setIsOpen(false);
    }

    const [modalContent, setModalContent] = useState();
    // END Modal

    // Idle timer
    const [state, setState] = useState("Active");
    const [count, setCount] = useState(0);
    const [emailError, setEmailError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState("");
    const [remaining, setRemaining] = useState(1);

    const onIdle = () => {
        setState("Idle");
    };

    const onActive = () => {
        setState("Active");
    };

    const onAction = () => {
        setCount(count + 1);
    };

    const { getRemainingTime } = useIdleTimer({
        onIdle,
        onActive,
        onAction,
        timeout: 180_000,
        throttle: 500,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            // console.log("setRemaining");
            setRemaining(Math.ceil(getRemainingTime() / 1000));
        }, 500);

        return () => {
            // console.log("clearInterval");
            clearInterval(interval);
        };
    });
    // END Idle timer

    const { setCurrentUser, setUserToken } = useStateContext();
    const { currentPatient, setCurrentPatient } = useStateContext();
    const [email, setEmail] = useState("");
    const [hide, setHide] = useState(false);
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

    // useEffect(() => {
    //     setProduct();
    // }, [translateIntoNumbers]);

    useEffect(() => {
        setEmailError(false);
        setEmailSent(false);
        setLoading(true);
        // const { user } = useParams();
        // getPrestashop();
        if (user) {
            axiosClient
                .get(`patientData?user=${user}`)
                .then(({ data }) => {
                    // setSurvey(data.data);

                    setCurrentPatient(data.patientData[0]);
                    setUserEdited(data.patientData[0].user);
                    setEmailEdited(data.patientData[0].weight);
                    setAgeEdited(data.patientData[0].age);
                    setAnswers(data.patientDataAnswers);

                    setQuestions(data.patientQuestionsAnswered);

                    if (answers !== undefined && questions !== undefined) {
                        setLoading(true);
                        calculateSurveys(answers, questions);
                        setLoading(false);
                    }

                    // setSurveys(data.totalSurveys);
                    setSurveys(data.surveysAnswered);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                });
        }
    }, []);

    function calculateSurveys(answers, questions) {
        const arraySurveys = [];
        answers.map((a) =>
            questions.map((q) => {
                if (a.survey_question_id === q.id) {
                    arraySurveys.map((exist) => {
                        if (exist !== q.survey_id) {
                            arraySurveys.push(q.survey_id);
                        }
                    });
                }
            })
        );
    }

    function getUser() {
        const { user } = useParams();

        return user;
    }

    function fetchQuestion(question) {
        questions &&
            questions.map((q) => {
                if (q.id === question) {
                    return "xor";
                }
            });
    }

    let finalArray = [];
    function translateIntoNumbers(desc, question, survey) {
        let numberedMeds;

        if (desc !== "") {
            numberedMeds = desc.split(",");
        }

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

        // productsArray.map((p) => getPrestashop(p));
    }

    function translateIntoArray(desc, question, survey) {
        let numberedMeds;
        let numberedMedsWithSurvey = [survey, question];

        if (desc !== "") {
            numberedMeds = desc.split(",");
        }

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

        // return resultsArrayWithoutSpaces; // only numbers
        return numberedMedsWithSurvey; // onlt numbers
    }

    function validateEmail(mail) {
        if (!mail || mail === "NA") {
            setEmailErrorText("Veuillez ajouter une adresse mail");
            setEmailError(true);
        } else {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (mail.match(mailformat)) {
                setEmailError(false);
                setEmailErrorText("");
                emailjs
                    // .sendForm(
                    //     "YOUR_SERVICE_ID",
                    //     "YOUR_TEMPLATE_ID",
                    //     form.current,
                    //     "YOUR_PUBLIC_KEY"
                    // )
                    .sendForm(
                        "service_r7htw3c",
                        "template_bn603m5",
                        form.current,
                        "d-KnZYpZeSh32IPp8"
                    )
                    .then(
                        (result) => {
                            if (result.text === "OK") {
                                setEmailError(false);
                                setEmailErrorText("");
                                setEmailSent(true);
                            }
                        },
                        (error) => {
                            console.log(error.text);
                        }
                    );
                return true;
            }
            console.log("INVALID Email");
            setEmailError(true);
            setEmailErrorText("Adresse mail invalide");
            return false;
        }
    }

    // Send EMAIL
    const form = useRef();
    const [userEdited, setUserEdited] = useState(user.user);
    const [ageEdited, setAgeEdited] = useState(user.user);
    const [emailEdited, setEmailEdited] = useState(user.user);
    const [emailSent, setEmailSent] = useState(false);

    // END Send EMAIL

    return (
        <PageComponent
            id="yourAppElement"
            title="Merci pour votre participation. Voici vos résultats : "
            image={logo}
        >
            {loading && (
                <div className="flex justify-center items-center">
                    <div className=" w-8 h-8" role="status">
                        <img src={loadingGif} />
                    </div>
                </div>
            )}
            {/* User DATA */}
            <div>
                <p>
                    {/* {currentPatient && (
                        <PatientDataFinal currentPatient={currentPatient} />
                    )} */}
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

            {!loading && answers && (
                <>
                    {/* <p>///////////////////////////////</p> */}
                    {/* <ul>Surveys: </ul> */}
                    {surveys &&
                        surveys.map((s) => (
                            <>
                                <DashboardCard
                                    // title={s.title}

                                    className={`order-4 lg:order-2 row-span-2 mb-2 ${
                                        hide && `survey${s.id}`
                                    } `}
                                    style={{ animationDelay: "0.3s" }}
                                >
                                    {/* <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]"> */}

                                    <div className="flex flex-row py-4 px-6 shadow-md bg-white hover:bg-gray-50">
                                        <img
                                            src={
                                                import.meta.env
                                                    .VITE_API_BASE_URL +
                                                "/" +
                                                s.image
                                            }
                                            alt={s.title}
                                            className="h-28 object-cover mr-10"
                                        />
                                        <div className="">
                                            <p>
                                                Voici nos conseils sur le sujet
                                                :{" "}
                                            </p>
                                            <h3 className="text-2xl font-semibold">
                                                {s.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Questions & Conseils */}
                                    <div>
                                        <ul>
                                            {!loading &&
                                                answers &&
                                                answers.map((answer) => (
                                                    <li>
                                                        {/* <h2>Question answered: </h2> */}
                                                        <div>
                                                            {}
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
                                                                                        Nos
                                                                                        conseils
                                                                                        pour{" "}
                                                                                        <span className="text-green-600 font-bold">
                                                                                            {" "}
                                                                                            {
                                                                                                q.question
                                                                                            }
                                                                                            {
                                                                                                " :"
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
                                                                                                className="text-gray-800 ml-4"
                                                                                            >
                                                                                                {/* Vous
                                                                                                avez
                                                                                                une
                                                                                                carence
                                                                                                en */}
                                                                                                {/* Nos
                                                                                                conseils */}

                                                                                                {/* <span className="font-bold"> */}
                                                                                                {/* <span>
                                                                                                    {" "}
                                                                                                    {dangerouslySetInnerHTML(
                                                                                                        q.conseils
                                                                                                    )}
                                                                                                </span> */}
                                                                                                <ReactMarkdown>
                                                                                                    {
                                                                                                        q.conseils
                                                                                                    }
                                                                                                </ReactMarkdown>
                                                                                            </h2>
                                                                                            {/* <p className="text-left">
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
                                                                                                /> */}
                                                                                            {/* {translateIntoNumbers(
                                                                                        q.description,
                                                                                        q.question,
                                                                                        s.title
                                                                                    )} */}
                                                                                            {/* </h3> */}
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
            {error.__html && (
                <div
                    className="bg-red-500 rounded py-2 px-3 text-white"
                    dangerouslySetInnerHTML={error}
                ></div>
            )}
        </PageComponent>
    );
}
