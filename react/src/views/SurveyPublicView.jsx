import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicQuestionView from "../components/PublicQuestionView";
import axiosClient from "./../axios";

export default function SurveyPublicView() {
    const answers = {};
    const [surveyFinished, setSurveyFinished] = useState(false);
    const [survey, setSurvey] = useState({ questions: [] });
    const [loading, setLoading] = useState(false);
    const { slug } = useParams();
    const [meds, setMeds] = useState([]);
    const [countedMeds, setCountedMeds] = useState([]);
    const [loadedConseils, setLoadedConseils] = useState([]);

    const conseils = [
        {
            id: 1,
            nom: "Cystiphane Biorga Cpr B/120",
            cod: 3560398504251,
            prix: 19.9,
        },
        {
            id: 7,
            nom: "FORCAPIL FOTIF Gél chev ongl pilul/180+6",
            cod: 3401547819976,
            prix: 34.9,
        },
    ];

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get(`survey/get-by-slug/${slug}`)
            .then(({ data }) => {
                setLoading(false);
                setSurvey(data.data);
                // console.log(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
        setLoadedConseils(conseils);
    }, []);

    useEffect(() => {
        // countSameMedsInArray(meds);
        setCountedMeds(countSameMedsInArray(meds));
    }, [meds]);

    function answerChanged(question, value) {
        answers[question.id] = value;
        console.log(question);
        // console.log(value);

        if (value == "Oui") {
            console.log("addToMeds");
            addToMeds(question);
        } else if (value == "Non") {
            console.log("removeFromMeds");
            removeFromMeds(question);
        }
    }

    function checkForProduct(id) {
        const filterObj = conseils.filter((e) => e.id == id);

        if (filterObj[0]) {
            console.log("filterObj[0]");
            console.log(filterObj[0].nom);
            return filterObj[0].nom;
            console.log(id);
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
        console.log(keys);
        const values = Object.values(countObject);
        console.log(values);
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
        console.log("resultsWithoutSpaces");
        console.log(resultsWithoutSpaces);

        return resultsWithoutSpaces;
    }

    function addToMeds(question) {
        // console.log("questionToAdd");
        let newMeds;
        let medsArray = translateIntoNumbers(question.description);
        newMeds = meds.concat(medsArray);
        // newMeds = translateIntoNumbers(newMeds);
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

    function onSubmit(ev) {
        ev.preventDefault();
        console.log(answers);
        axiosClient
            .post(`/survey/${survey.id}/answer`, {
                answers,
            })
            .then((response) => {
                debugger;
                setSurveyFinished(true);
            });
    }

    // return <div>{JSON.stringify(survey, undefined, 2)}</div>;

    return (
        <div>
            {loading && <div className="flex justify-center">Loading...</div>}
            {!loading && (
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
                            className="col-span-2"
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
                                                <>
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
                                                </>
                                            );
                                        })}
                                    </h3>
                                </>
                            )}

                            <strong>MedsForQuestion: {meds}</strong>
                        </div>
                    </div>
                    <div className="grid grid-cols-4">
                        <p>
                            <strong>Question: {meds && meds.question}</strong>
                            <strong>MedsForQuestion: {meds}</strong>
                        </p>
                    </div>

                    {surveyFinished && (
                        <div className="py-8 px-6 bg-emerald-500 text-white w-[600px] mx-auto">
                            Thank you for participating in the survey
                        </div>
                    )}
                    {!surveyFinished && (
                        <>
                            <div>
                                {survey.questions &&
                                    survey.questions.map((question, index) => (
                                        <PublicQuestionView
                                            key={question.id}
                                            question={question}
                                            index={index}
                                            answerChanged={(val) =>
                                                answerChanged(question, val)
                                            }
                                        />
                                    ))}
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
            )}
        </div>
    );
}
