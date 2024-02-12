import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import axiosClient from "../axios";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import PaginationLinks from "../components/PaginationLinks";
import SurveyListItem from "../components/SurveyListItem";
import "tw-elements"; // Loading CSS
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";

export default function Reponses() {
    // const state = useStateContext();
    // const { surveys } = useStateContext();
    const { showToast } = useStateContext();
    const [answers, setAnswers] = useState([]);
    const [meta, setMeta] = useState({}); // for pagination
    const [loading, setLoading] = useState(false);

    // console.log(surveys);

    const getAllAnswers = (url) => {
        url = url || "/get-all-answers"; // if first or previous/next pages survey?page=2
        setLoading(true);
        axiosClient.get(url).then(({ data }) => {
            console.log(data.allAnswers);
            setAnswers(data.allAnswers.data);
            // setMeta(data.meta);
            setMeta(data.allAnswers);
            setLoading(false);
        });
    };

    const onDeleteClick = (id) => {
        if (window.confirm("Are you sure you want to delete this survey?")) {
            axiosClient.delete(`/survey/${id}`).then(() => {
                getSurveys(); //reload
                showToast("The survey was deleted");
            });
        }
    };

    const onPageClick = (link) => {
        console.log(link);
        getAllAnswers(link.url);
    };

    useEffect(() => {
        getAllAnswers();
    }, []);

    // const checkForDuplicates = (arrayToCheck) => {
    //     let othersArray = [];
    //     arrayToCheck.map((a) => {
    //         console.log("a.other");
    //         console.log(a.other);
    //         othersArray.push(a.other);
    //         othersArray.map((x) => {
    //             console.log("x");
    //             console.log(x);
    //             console.log(othersArray);
    //             if (x !== a.other) {
    //                 othersArray.push(a.other);
    //             }
    //             console.log("heer");
    //         });
    //     });

    // console.log(othersArray);
    // };

    const now = new Date();
    console.log(now);
    const day = now.getDay(); // returns a number representing the day of the week, starting with 0 for Sunday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    console.log(`Today is day ${day} and the time is ${hours}:${minutes}.`);
    return (
        <PageComponent
            title="Toutes les Réponses"
            // buttons={
            //     <TButton color="green" to="/surveys/create">
            //         <PlusCircleIcon className="h-6 w-6 mr-2" />
            //         Create new
            //     </TButton>
            // }
        >
            {loading && (
                <div className="flex justify-center items-center">
                    <div
                        className="text-purple-500 spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                        role="status"
                    >
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            )}
            {!loading && (
                <>
                    {answers.length === 0 && (
                        <div className="py-8 text-center text-gray-700">
                            Les résultats ne sont pas visibles / Pas de
                            résultats.
                        </div>
                    )}
                    <div className="grid grid-cols-1 gap-5 bg-white text-left px-6 py-6 text-sm">
                        <table>
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="bg-gray-100 pl-2"
                                    >
                                        Nom Prénom
                                    </th>
                                    <th scope="col" className="pl-2">
                                        Age
                                    </th>
                                    <th
                                        scope="col"
                                        className="bg-gray-100 pl-2"
                                    >
                                        Email
                                    </th>
                                    <th scope="col" className="pl-2">
                                        Jour/Heure
                                    </th>
                                    <th
                                        scope="col"
                                        className="bg-gray-100 pl-2"
                                    >
                                        Lien Client
                                    </th>
                                    <th scope="col">
                                        <span class="t">Sujets </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="acc acg">
                                {answers.map(
                                    (answer) => {
                                        if (1) {
                                            return (
                                                <tr className="border-t-4 border-gray-300 mt-2 mb-2">
                                                    <td className="bg-gray-100 pl-2">
                                                        {answer.user === "NA"
                                                            ? "anonyme"
                                                            : answer.user}
                                                    </td>
                                                    <td className="pl-2">
                                                        {answer.age === "NA"
                                                            ? "anonyme"
                                                            : answer.age}
                                                    </td>
                                                    <td className="bg-gray-100 pl-2">
                                                        {answer.weight === "NA"
                                                            ? "anonyme"
                                                            : answer.weight}
                                                    </td>
                                                    <td className="pl-2">
                                                        {/* {answer.created_at} */}
                                                        {answer.start_date}
                                                        {/* {Date.getDay(
                                                            answer.created_at
                                                        )} */}
                                                    </td>
                                                    <td className="bg-gray-100 pl-2">
                                                        <Link
                                                            target={"_blank"}
                                                            className="text-blue-700 underline"
                                                            to={`/display-results/${answer.other}`}
                                                        >
                                                            {answer.other}
                                                        </Link>
                                                    </td>
                                                    <td>{answer.title}</td>
                                                </tr>
                                            );
                                        }
                                    }

                                    // <SurveyListItem
                                    //     inactive={survey.status == 0}
                                    //     survey={survey}
                                    //     key={survey.id}
                                    //     onDeleteClick={onDeleteClick}
                                    // />
                                )}
                            </tbody>
                        </table>
                    </div>
                    {answers.length > 0 && (
                        <PaginationLinks
                            meta={meta}
                            onPageClick={onPageClick}
                        />
                    )}
                </>
            )}
        </PageComponent>
    );
}
