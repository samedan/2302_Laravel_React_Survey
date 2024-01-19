import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate, redirect } from "react-router-dom";
import PublicQuestionView from "../components/PublicQuestionView";
import axiosClient from "./../axios";
import PatientData from "./PatientData";
import { useStateContext } from "../contexts/ContextProvider";
import { stringify } from "uuid";
import PageComponent from "../components/PageComponent";
import SurveyListItemPublic from "../components/SurveyListItemPublic";
import { useMediaQuery } from "./hooks";
import TButton from "../components/core/TButton";
import {
    PlusCircleIcon,
    ExclamationTriangleIcon,
    CheckBadgeIcon,
} from "@heroicons/react/20/solid";
import { useIdleTimer } from "react-idle-timer/legacy";

export default function SurveyPublicView() {
    const [surveyFinished, setSurveyFinished] = useState(false);
    const [survey, setSurvey] = useState({ questions: [] });
    const [loading, setLoading] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [meds, setMeds] = useState([]);
    const [countedMeds, setCountedMeds] = useState([]);
    const [loadedConseils, setLoadedConseils] = useState([]);
    const [manquements, setManquements] = useState([]);
    // const [answers, setAnswers] = useState({ 0: "cur" });
    const [answersQuestions, setAnswersQuestions] = useState({});
    const [error, setError] = useState("");
    const [answers2, setAnswers2] = useState({});
    const [additionalSurveys, setAdditionalSurveys] = useState();
    const [finishedAllSurveys, setFinishedAllSurveys] = useState(false);
    const { currentPatient, setCurrentPatient } = useStateContext();
    const { currentPatientHere, setCurrentPatientHere } = useState({});
    const [totalDataPatient, setTotalDataPatient] = useState([]);

    const conseils = [
        {
            id: 1,
            nom: "Cystiphane Biorga Cpr B/120",
            cod: 3560398504251,
            prix: 19.9,
        },
        {
            id: 2,
            nom: "DAYANG OLIGO ELEMENT Se ACR Gél B/30",
            cod: 3700026996130,
            prix: 10.8,
        },
        {
            id: 3,
            nom: "DORIANCE SOLAIRE Caps 2B/30",
            cod: 3700026996130,
            prix: 23.9,
        },
        {
            id: 4,
            nom: "FORCAPIL ANTI-CHUTE Cpr 3Pilul/30",
            cod: 3578835502954,
            prix: 39.4,
        },
        {
            id: 5,
            nom: "FORCAPIL ANTI-CHUTE Gom P/60",
            cod: 3578835504255,
            prix: 39.5,
        },
        {
            id: 6,
            nom: "FORCAPIL CROISSANCE Gom P/60",
            cod: 3578835503494,
            prix: 20.9,
        },
        {
            id: 7,
            nom: "FORCAPIL FOTIF Gél chev ongl pilul/180+6",
            cod: 3401547819976,
            prix: 34.9,
        },
        {
            id: 8,
            nom: "FORCAPIL FORTIF Gél Pilulier/180+600+sh",
            cod: 3578835503258,
            prix: 34.9,
        },
        {
            id: 9,
            nom: "LUXEOL GUMMIES FORCE CROIS Gom P/60",
            cod: 3760007337109,
            prix: 32.9,
        },
        {
            id: 10,
            nom: "NUTRISENTIELS Collagène Gél B/30",
            cod: 3515450070574,
            prix: 7.9,
        },
        {
            id: 11,
            nom: "NUTRISENTIELS Zn Gél B/30",
            cod: 3515450073315,
            prix: 8.5,
        },
        {
            id: 12,
            nom: "SEBACTASE Cpr B/30",
            cod: 3525722014295,
            prix: 15.9,
        },
        {
            id: 13,
            nom: "UV3DERM CONFORT Gél B/120",
            cod: 3525722035170,
            prix: 44.5,
        },
    ];

    useEffect(() => {
        setLoading(true);
        setError("");
        if (currentPatient) {
            console.log("currentPatient");
            console.log(currentPatient);
        }
        axiosClient
            .get(`survey/get-by-slug/${slug}`)
            .then(({ data }) => {
                setLoading(false);
                setSurvey(data.data);
                console.log(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
        setLoadedConseils(conseils);
    }, [slug]);

    useEffect(() => {
        if (finishedAllSurveys) {
            console.log("here");

            setTimeout(3000);
            console.log(currentPatient.other_id);

            navigate(`/display-results:${currentPatient.other_id}`);
        } else {
            console.log("still here");
        }
    }, [finishedAllSurveys]);

    useEffect(() => {
        // countSameMedsInArray(meds);
        setCountedMeds(countSameMedsInArray(meds));
    }, [meds]);

    function answerChanged(question, value) {
        console.log(question, value);
        console.log("question.id", question.id);
        console.log(typeof value);
        // const idQuestion = JSON.stringify(question.id);
        const idQuestion = parseInt(question.id);
        console.log(idQuestion);
        // let response = { idQuestion: { value } };
        // answers[question.id] = value;
        let objPrimaire = { idQuestion: value };
        let obj = { ...answersQuestions };
        // let obj = Object.defineProperty(answers, idQuestion, { value });
        // let obj = Object.defineProperty(answersQ, idQuestion, { value });
        obj[idQuestion] = value;
        console.log("obj");
        console.log(obj);

        // console.log("newObjectPatient");
        // console.log(newObjectPatient);
        // console.log(currentPatient);
        // console.log(obj);
        // let clone = Object.assign({}, obj);
        // console.log("clone");
        // console.log(clone);

        // answers = obj;
        setAnswersQuestions(obj);

        // console.log("answers");
        // console.log(answersQ);
        if (value == "Oui") {
            // console.log("addToMeds");
            addToMeds(question);
        } else if (value == "Non") {
            console.log("removeFromMeds");
            removeFromMeds(question);
        }
    }

    // function answerChanged(question, value) {
    //     answers[question.id] = value;
    //     console.log(question, value);
    // }

    // console.log("currentPatient on SurveyPublicView", currentPatient);

    function checkForProduct(id) {
        const filterObj = conseils.filter((e) => e.id == id);

        if (filterObj[0]) {
            // console.log("filterObj[0]");
            // console.log(filterObj[0].nom);
            return filterObj[0].nom;
            // console.log(id);
        }
    }

    function countSameMedsInArray(myArray) {
        let countObject = myArray.reduce(function (count, currentValue) {
            return (
                count[currentValue]
                    ? ++count[currentValue]
                    : (count[currentValue] = 1),
                count
            );
        }, {});

        // console.log(countObject);
        setCountedMeds(countObject);
        // const keys = Object.keys(a);
        // const values = Object.values(a);
        const keys = Object.keys(countObject);
        // console.log(keys);
        const values = Object.values(countObject);
        // console.log(values);
        return countObject;
    }

    function convertObjectOfCountsIntoArray(countedMeds) {
        const res_array = [];
        for (let i in countedMeds) {
            res_array.push([i, countedMeds[i]]);
        }
        // console.log(res_array);
        // employees.sort((a, b) => b.age - a.age);
        // employees.forEach((e) => {
        //     console.log(`${e.firstName} ${e.lastName} ${e.age}`);
        // });
        res_array.sort((a, b) => b[1] - a[1]);
        // res_array.forEach((e) => {
        //     console.log(`${e[0]} ${e[1]}`);
        // });
        return res_array;
    }

    function translateIntoNumbers(desc) {
        let numberedMeds;
        // console.log(typeof desc);
        numberedMeds = desc.split(",");
        // let arr = desc.split(",").filter((element) => element);
        // console.log("numberedMeds");
        // console.log(numberedMeds);
        let resultsWithoutSpaces;
        resultsWithoutSpaces = numberedMeds.map((el) => {
            return el.trim();
        });
        // console.log("resultsWithoutSpaces");
        // console.log(resultsWithoutSpaces);

        return resultsWithoutSpaces;
    }

    function addToMeds(question) {
        // console.log("questionToAdd");
        let newMeds;
        let manqueDe;
        manqueDe = manquements.concat(question.conseils);

        let medsArray = translateIntoNumbers(question.description);
        newMeds = meds.concat(medsArray);
        // newMeds = translateIntoNumbers(newMeds);
        setManquements(
            `Pour ` + question.question + " vous avez un manque de " + manqueDe
        );
        setMeds(newMeds);
    }

    function removeFromMeds(question) {
        console.log("removeMeds");
        let newMeds;
        let medsArrayToRemove = translateIntoNumbers(question.description);
        // let medsArray = question.description;

        // console.log("numbers to remove");
        // console.log(medsArray);

        // console.log(meds);

        let removeElement = (myArray, n) => {
            // const myArray = [1, 2, 3, 4, 5];
            // const index = myArray.indexOf(2);
            // const x = myArray.splice(index, 1);
            // console.log(`myArray values: ${myArray}`);

            const index = myArray.indexOf(n);
            const x = myArray.splice(index, 1);
            console.log(`myArray values: ${myArray}`);
            return myArray;
        };
        let arrayOfMultiples;
        arrayOfMultiples = medsArrayToRemove.map((eachElToRemoveFromMeds) => {
            removeElement(meds, eachElToRemoveFromMeds);

            // console.log("eachElToRemoveFromMeds");

            // console.log(typeof eachElToRemoveFromMeds);
            // console.log(eachElToRemoveFromMeds);

            console.log("ArrayLeft in Meds");
            console.log(meds);
            // setMeds(arrayOfMultiples);
        });

        // newMeds = translateIntoNumbers(newMeds);
        // setMeds(meds);
        // console.log("newMeds");
        // console.log(arrayOfMultiples);
        // setMeds(newMeds);
    }

    function verifyAvailableSurveys(patient) {
        console.log("patient", patient);
        axiosClient
            .get(`/available/surveys?user=${patient.other}`)
            .then((response) => {
                console.log(response.data);
                setTotalDataPatient(response.data);
                getOnlyLeftOverSurveys(response.data);
                // setAdditionalSurveys(response.data);
                // if (response.data.surveysLeftToAnswerIds == []) {
                //     console.log("here");

                //     setTimeout(3000);

                //     navigate("/display-results");
                // }
            });
    }

    function onSubmit(ev) {
        ev.preventDefault();
        // const copy = { ...answers };
        // console.log("copy");
        // console.log(copy);
        // console.log("answers");
        console.log("answersQuestions");
        console.log(answersQuestions);

        // const gipsy = JSON.stringify(answers);

        // console.log(gipsy);
        // debugger;
        axiosClient
            .post(`/survey/${survey.id}/answer`, {
                answers: answersQuestions,
                user: currentPatient["user"],
                age: currentPatient["age"],
                weight: currentPatient["weight"],
                height: currentPatient["height"],
                other: currentPatient["other"],
                other_id: currentPatient["other"],
            })
            .then((response) => {
                console.log(response);
                // debugger;
                setSurveyFinished(true);
                setMeds([]);
                setCountedMeds([]);
                setLoadedConseils([]);
                setManquements([]);
                setAnswersQuestions({});
                // verifyAvailableSurveys(currentPatient["user"]);
                resetPatient();
                // setAdditionalSurveys();
            })
            .catch((error) => {
                console.log(error.message);
                if (error) {
                    setError(
                        "veuillez choisir au moins une réponse avant de valider"
                    );
                }
                // if (error.message == "Network Error") {
                //     console.log(error.message);
                //     setError({ __html: error.message });
                // }

                // if (error.response) {
                //     console.log(error.response.data);
                //     if (error.response.data.errors) {
                //         console.log("here");
                //         const finalErrors = Object.values(
                //             error.response.data.errors
                //         ).reduce((accum, next) => [...accum, ...next], []);
                //         setError({ __html: finalErrors.join("<br>") });
                //     } else {
                //         const finalErrors = Object.values(error.response.data);
                //         setError({ __html: finalErrors[0] });
                //     }
                // }
            });
    }

    function goHome() {
        // setCurrentPatient();
        console.log("goHome");
        setCurrentPatient({});
        console.log("currentPatient");
        console.log(currentPatient);
        // verifyAvailableSurveys(currentPatient);
        navigate("/");
    }

    function getOnlyLeftOverSurveys(data) {
        console.log("data", data);
        const x = data.totalSurveysNumber - data.totalAnswers;
        const {
            totalSurveys,
            totalAnswers,
            totalAnswersByUser,
            totalSurveysNumber,
        } = data;

        console.log("NumberOfStillAvailableSurveys: ", x);
        if (x == 0) {
            console.log("X 378 here");

            setTimeout(3000);

            // navigate("/display-results");
            navigate(`/display-results/` + currentPatient["other"]);
        } else {
            console.log(x);
        }
        console.log("NumberOfAnsweredSurveys: ", totalAnswers);
        let surveysAnsweredIds = [];
        let surveysAnsweredIdsArray = [];
        totalAnswersByUser.map((answer) => {
            console.log(answer.survey_id);
            surveysAnsweredIds.push(answer.survey_id);
        });
        // surveysAnsweredIds = surveysAnsweredIdsArray;
        console.log("surveysAnsweredIds", surveysAnsweredIds);
        let totalSurveyIds = [];
        totalSurveys.map((survey) => {
            totalSurveyIds.push(survey.id);
        });
        console.log("totalSurveyIds", totalSurveyIds);
        // const intersection = totalSurveyIds.filter((element) =>
        //     surveysAnsweredIds.includes(element)
        // );
        const surveysLeftToAnswerIds = totalSurveyIds.filter(
            (element) => !surveysAnsweredIds.includes(element)
        );
        console.log("surveysLeftToAnswerIds", surveysLeftToAnswerIds);

        const surveysLeftToAnswer = totalSurveys.filter((element) =>
            surveysLeftToAnswerIds.includes(element.id)
        );
        console.log("surveysLeftToAnswer", surveysLeftToAnswer);
        if (surveysLeftToAnswer == []) {
            // Finished all surveys
            setFinishedAllSurveys(true);
        } else {
            setAdditionalSurveys(surveysLeftToAnswer);
        }
    }

    function resetPatient() {
        // setCurrentPatientHere({});
        verifyAvailableSurveys(currentPatient);
    }

    function isObjEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    var emptyObject = {};
    var object = { foo: "bar" };
    // return <div>{JSON.stringify(survey, undefined, 2)}</div>;

    const isRowBased = useMediaQuery("(min-width: 500px)");
    return (
        <PageComponent
            title="Veuillez remplir vos données."
            buttons={
                <TButton
                    color="red"
                    onClick={goHome}
                    className="w-60 flex justify-center rounded-md border 
                    border-transparent bg-indigo-600 py-4 px-4  font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  text-lg"
                >
                    <span className="text-lg">
                        Revenir au debut / Recommencer
                    </span>
                    <ExclamationTriangleIcon className="h-6 w-6 ml-2" />
                </TButton>
            }
            // image={logo}
        >
            <>
                {isObjEmpty(currentPatient) && (
                    <div className="content-center">
                        <div
                            className="content-center "
                            style={{
                                margin: "auto",
                                width: isRowBased ? "50%" : "90%",
                            }}
                        >
                            <p className="max-w-md text-lg">
                                Les champs de données à remplir ne sont{" "}
                                <strong>pas obligatoires</strong>. Si vous
                                voulez garder les résultats de l'étude, vous
                                devez remplir le champ <strong>Email</strong>.
                            </p>
                        </div>
                        <div
                            className=" md:container md:mx-auto sm:grid-cols max-w-lg"
                            style={{
                                margin: "auto",
                                width: isRowBased ? "50%" : "90%",
                            }}
                        >
                            <PatientData />
                        </div>
                    </div>
                )}
                <div>
                    {loading && (
                        <div className="flex justify-center">Chargement...</div>
                    )}
                    {!loading && !isObjEmpty(currentPatient) && (
                        <>
                            {/* <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 borer border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600
                hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={resetPatient}
                            >
                                Reset Patient
                            </button>
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 borer border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600
                hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() => navigate("/display-results")}
                            >
                                Navigate to Results
                            </button> */}
                            <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50">
                                <form
                                    onSubmit={(ev) => onSubmit(ev)}
                                    className="container mx-auto "
                                >
                                    <div className="grid grid-cols-6">
                                        {!surveyFinished && (
                                            <>
                                                <div className="mr-4">
                                                    <img
                                                        src={survey.image_url}
                                                        alt=""
                                                        className="w-full object-cover rounded-md mb-8"
                                                    />
                                                </div>
                                                <div className="col-span-3 mb-8">
                                                    <h1 className="text-3xl mb-3">
                                                        {survey.title}
                                                    </h1>
                                                    {/* <p className="text-gray-500 text-sm mb-3">
                                            Expire date:{" "}
                                            {survey.expire_date}
                                        </p> */}
                                                    <p className="text-gray-500 text-sm mb-3">
                                                        Description:{" "}
                                                        {survey.description}
                                                    </p>
                                                </div>
                                            </>
                                        )}

                                        {/* <div
                                            className="col-span-1"
                                            style={{ backgroundColor: "white" }}
                                        >
                                            {countedMeds != [] && (
                                                <>
                                                    <h2
                                                        style={{
                                                            color: "green",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        Produits conseils
                                                    </h2>
                                                    <h3>
                                                        {convertObjectOfCountsIntoArray(
                                                            countedMeds
                                                        ).map((res, index) => {
                                                            // console.log("res[0]");
                                                            // console.log(res[0]);
                                                            // console.log(
                                                            //     "loadedConseils[res[0]]"
                                                            // );

                                                            // console.log(loadedConseils[res[0]]);
                                                            return (
                                                                <div
                                                                    key={index}
                                                                >
                                                                    <p>
                                                                        <strong>
                                                                            {
                                                                                res[0]
                                                                            }
                                                                        </strong>{" "}
                                                                        -{" "}
                                                                        {res[1]}{" "}
                                                                        -{" "}
                                                                        {
                                                                            <>
                                                                                {checkForProduct(
                                                                                    res[0]
                                                                                )}
                                                                            </>
                                                                        }
                                                                    </p>
                                                                </div>
                                                            );
                                                        })}
                                                    </h3>
                                                </>
                                            )}

                                            <strong>
                                                MedsForQuestion: {meds}
                                            </strong>
                                        </div>
                                        <div
                                            className="col-span-1"
                                            style={{ backgroundColor: "white" }}
                                        >
                                            <h2
                                                style={{
                                                    color: "green",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Manque de:
                                            </h2>
                                            {manquements && (
                                                <p>{manquements.toString()}</p>
                                            )}
                                        </div> */}
                                    </div>
                                    {/* <div className="grid grid-cols-4">
                                        <p>
                                            <strong>
                                                Question:{" "}
                                                {meds && meds.question}
                                            </strong>
                                            <strong>
                                                MedsForQuestion: {meds}
                                            </strong>
                                        </p>
                                    </div> */}
                                    {finishedAllSurveys && (
                                        <>
                                            <div className="py-2 px-2 bg-emerald-500 text-white w-[600px] mx-auto">
                                                Merci ! Vous avez fini de
                                                répondre à nos questionnaires.
                                            </div>
                                        </>
                                    )}
                                    {surveyFinished && (
                                        // !finishedAllSurveys &&
                                        <>
                                            <div className="py-2 px-6 mb-4 bg-sky-500 text-white  mx-auto text-xl">
                                                Merci d'avoir répondu aux
                                                questions sur les{" "}
                                                <strong>{survey.title}</strong>
                                            </div>
                                            <ul>
                                                {additionalSurveys && (
                                                    <li>
                                                        <p className="text-xl">
                                                            Vous pouvez
                                                            continuer à répondre
                                                            sur les sujets
                                                            suivants :{" "}
                                                        </p>
                                                    </li>
                                                )}
                                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                                                    {additionalSurveys &&
                                                        additionalSurveys.map(
                                                            (surveyLeft) => (
                                                                <>
                                                                    <li
                                                                        key={
                                                                            surveyLeft.title
                                                                        }
                                                                    >
                                                                        <Link
                                                                            to={`/survey/public/${surveyLeft.slug}`}
                                                                            // state={{ answer: "occupation" }}
                                                                            // state={{ from: "occupation" }}
                                                                            onClick={() =>
                                                                                setSurveyFinished(
                                                                                    false
                                                                                )
                                                                            }
                                                                            className="block p-2 hover:bg-gray-100/90"
                                                                        >
                                                                            <SurveyListItemPublic
                                                                                inactive={
                                                                                    surveyLeft.status ==
                                                                                    0
                                                                                }
                                                                                survey={
                                                                                    surveyLeft
                                                                                }
                                                                                key={
                                                                                    surveyLeft.id
                                                                                }
                                                                                continuedSurvey
                                                                                // onDeleteClick={onDeleteClick}
                                                                            />
                                                                            {/* {
                                                                                surveyLeft.title
                                                                            } */}
                                                                        </Link>
                                                                    </li>
                                                                </>
                                                            )
                                                        )}
                                                </div>

                                                {additionalSurveys && (
                                                    <li>
                                                        <p className="mt-3 mb-1 text-xl">
                                                            Ou vous pouvez
                                                            trouver et
                                                            sauvegarder vos
                                                            réponses et voir nos
                                                            recomandations :
                                                        </p>
                                                        <div
                                                            className="place-content-center"
                                                            style={{
                                                                display: "flex",
                                                            }}
                                                        >
                                                            <TButton
                                                                // color="green"
                                                                to={`/display-results/${currentPatient.other}`}
                                                                className="w-40 flex rounded-md border border-transparent bg-orange-500 py-4 px-4  font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2  text-xl"
                                                                style={{
                                                                    backgroundColor:
                                                                        "orange !important",
                                                                }}
                                                            >
                                                                <span className="text-xl">
                                                                    Voir les
                                                                    résultats
                                                                </span>
                                                                <CheckBadgeIcon className="h-6 w-6 ml-2" />
                                                            </TButton>
                                                        </div>
                                                    </li>
                                                )}
                                            </ul>
                                        </>
                                    )}
                                    {!surveyFinished && (
                                        <>
                                            <div>
                                                {survey.questions &&
                                                    survey.questions.map(
                                                        (question, index) => (
                                                            <PublicQuestionView
                                                                key={
                                                                    question.id
                                                                }
                                                                question={
                                                                    question
                                                                }
                                                                index={index}
                                                                answerChanged={(
                                                                    val
                                                                ) =>
                                                                    answerChanged(
                                                                        question,
                                                                        val
                                                                    )
                                                                }
                                                            />
                                                        )
                                                    )}
                                            </div>
                                            {error && (
                                                <p
                                                    className="text-red text-xl"
                                                    style={{ color: "red" }}
                                                >
                                                    Veuillez choisir au moins
                                                    une réponse avant de valider
                                                </p>
                                            )}
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center py-2 px-4 borer border-transparent shadow-sm text-xl font-medium rounded-md text-white bg-indigo-600
                        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Valider
                                            </button>
                                        </>
                                    )}
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </>
        </PageComponent>
    );
}
