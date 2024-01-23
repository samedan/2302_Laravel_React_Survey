import React, { useState, useEffect } from "react";
import axiosClient from "../axios";
import logo from "../assets/logo.png";
import PageComponent from "../components/PageComponent";
import PaginationLinks from "../components/PaginationLinks";
// import ModalVideo from "react-modal-video";
import "tw-elements"; // Loading CSS
import { useStateContext } from "../contexts/ContextProvider";
import SurveyListItemPublic from "../components/SurveyListItemPublic";

export default function SurveysPublic() {
    // const state = useStateContext();
    // const { surveys } = useStateContext();
    const { showToast } = useStateContext();
    const [surveys, setSurveys] = useState([]);
    const [meta, setMeta] = useState({}); // for pagination
    const [loading, setLoading] = useState(false);
    const [isOpen, setOpen] = useState(false); // video modal

    console.log(surveys);

    const getSurveys = (url) => {
        // url = url || "/survey" || "/start"; // if first or previous/next pages survey?page=2
        url = url || "/get-6-surveys"; // if first or previous/next pages survey?page=2
        console.log("url");
        console.log(url);
        setLoading(true);
        axiosClient.get(url).then(({ data }) => {
            setSurveys(data.data);
            setMeta(data.meta);
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
        getSurveys(link.url);
    };

    useEffect(() => {
        getSurveys();
    }, []);

    return (
        <PageComponent
            title="Commencez votre Bilan* gratuit Santé :"
            // buttons={
            //     <TButton color="green" to="/surveys/create">
            //         <PlusCircleIcon className="h-6 w-6 mr-2" />
            //         Create new
            //     </TButton>
            // }
            image={logo}
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
                    {/* <ModalVideo
                        autoPlay={1}
                        allow="autoplay"
                        isOpen={isOpen}
                        videoId="L61p2uyiMSo"
                        onClose={() => setOpen(false)}
                    />

                    <button
                        className="btn-primary"
                        onClick={() => setOpen(true)}
                    >
                        VIEW DEMO
                    </button> */}
                    {surveys.length === 0 && (
                        <div className="py-8 text-center text-gray-700 ">
                            Impossible de charger les études.
                        </div>
                    )}
                    <div className="grid grid-cols-1 gap-x-5 gap-y-1 sm:grid-cols-2 md:grid-cols-3 ">
                        {surveys.map((survey) => (
                            <SurveyListItemPublic
                                inactive={survey.status == 0}
                                survey={survey}
                                key={survey.id}
                                // onDeleteClick={onDeleteClick}
                            />
                        ))}
                    </div>

                    <div className="text-xl text-red-700 mt-1 font-bold">
                        *Cette enquête ne constitue en aucun cas un examen
                        médical et ne remplace pas l'avis du médecin. Veuillez
                        demander plus d’informations à votre pharmacien.
                    </div>
                    {surveys.length > 0 && (
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
