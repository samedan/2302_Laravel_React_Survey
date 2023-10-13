import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import PublicQuestionView from "../components/PublicQuestionView";
import axiosClient from "./../axios";
import PatientData from "./PatientData";
import { useStateContext } from "../contexts/ContextProvider";
import { stringify } from "uuid";

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
    const [answers, setAnswers] = useState({});
    const [additionalSurveys, setAdditionalSurveys] = useState();
    const [finishedAllSurveys, setFinishedAllSurveys] = useState(false);
    const { currentPatient, setCurrentPatient } = useStateContext();
    const { currentPatientHere, setCurrentPatientHere } = useState({});

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

            // navigate("/display-results");
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
        const idQuestion = JSON.stringify(question.id);
        // const idQuestion = parseInt(question.id);
        console.log(idQuestion);
        // let response = { idQuestion: { value } };
        // answers[question.id] = value;
        let objPrimaire = { idQuestion: value };

        let obj = Object.defineProperty(answers, idQuestion, { value });

        console.log("obj");
        console.log(obj);
        // answers = obj;
        setAnswers(obj);
        console.log("answers");
        console.log(answers);
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
            .get(`/available/surveys?user=${patient.user}`)
            .then((response) => {
                console.log(response.data);
                getOnlyLeftOverSurveys(response.data);
                // setAdditionalSurveys(response.data);
            });
    }

    function onSubmit(ev) {
        ev.preventDefault();
        console.log("answers");
        console.log(answers);

        const gipsy = JSON.stringify(answers);

        console.log(gipsy);
        debugger;
        axiosClient
            .post(`/survey/${survey.id}/answer`, {
                answers: answers,

                // answers: { 0: "cur" },
                user: currentPatient["user"],
                age: currentPatient["age"],
                weight: currentPatient["weight"],
                height: currentPatient["height"],
                other: currentPatient["other"],
            })
            .then((response) => {
                console.log(response);
                // debugger;
                setSurveyFinished(true);
                setMeds([]);
                setCountedMeds([]);
                setLoadedConseils([]);
                setManquements([]);
                setAnswers({});
                // verifyAvailableSurveys(currentPatient["user"]);
                resetPatient();
                // setAdditionalSurveys();
            });
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

    return (
        <>
            {isObjEmpty(currentPatient) && (
                <div className="grid grid-cols-6">
                    <PatientData />
                </div>
            )}
            <div>
                {loading && (
                    <div className="flex justify-center">Loading...</div>
                )}
                {!loading && !isObjEmpty(currentPatient) && (
                    <>
                        <button
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
                        </button>
                        <form
                            onSubmit={(ev) => onSubmit(ev)}
                            className="container mx-auto px-4"
                        >
                            <div className="grid grid-cols-6">
                                <div className="mr-4">
                                    <img src={survey.image_url} alt="" />
                                </div>
                                <div className="col-span-3">
                                    <h1 className="text-3xl mb-3">
                                        Title: {survey.title}
                                    </h1>
                                    <p className="text-gray-500 text-sm mb-3">
                                        Expire date: {survey.expire_date}
                                    </p>
                                    <p className="text-gray-500 text-sm mb-3">
                                        Description: {survey.description}
                                    </p>
                                </div>
                                <div
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
                                                        <div key={index}>
                                                            <p>
                                                                <strong>
                                                                    {res[0]}
                                                                </strong>{" "}
                                                                - {res[1]} -{" "}
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

                                    <strong>MedsForQuestion: {meds}</strong>
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
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <p>
                                    <strong>
                                        Question: {meds && meds.question}
                                    </strong>
                                    <strong>MedsForQuestion: {meds}</strong>
                                </p>
                            </div>
                            {finishedAllSurveys && (
                                <>
                                    <div className="py-8 px-6 bg-emerald-500 text-white w-[600px] mx-auto">
                                        Thank you. You finished all our surveys.
                                    </div>
                                </>
                            )}
                            {surveyFinished && (
                                // !finishedAllSurveys &&
                                <>
                                    <div className="py-8 px-6 bg-emerald-500 text-white w-[600px] mx-auto">
                                        Thank you for participating in the
                                        survey
                                    </div>
                                    <ul>
                                        {additionalSurveys &&
                                            additionalSurveys.map(
                                                (surveyLeft) => (
                                                    <li key={surveyLeft.title}>
                                                        <p>
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
                                                                {
                                                                    surveyLeft.title
                                                                }
                                                            </Link>
                                                        </p>
                                                    </li>
                                                )
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
                                                        key={question.id}
                                                        question={question}
                                                        index={index}
                                                        answerChanged={(val) =>
                                                            answerChanged(
                                                                question,
                                                                val
                                                            )
                                                        }
                                                    />
                                                )
                                            )}
                                    </div>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 borer border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600
                        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Submit
                                    </button>
                                </>
                            )}
                        </form>
                    </>
                )}
            </div>
        </>
    );
}
