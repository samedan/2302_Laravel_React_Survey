import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Signup from "./views/Signup";
import SurveyPublicView from "./views/SurveyPublicView";
import Surveys from "./views/Surveys";
import SurveyView from "./views/SurveyView";
import Answers from "./views/Answers";
import DisplayResults from "./views/DisplayResults";
import DisplayResultsEmail from "./views/DisplayResultsEmail";
import SurveysPublic from "./views/SurveysPublic";
import DisplayResultsAdmin from "./views/DisplayResultsAdmin";
import Reponses from "./views/Reponses";
import { CarouselWithContent } from "./views/Carousel";

const router = createBrowserRouter([
    {
        path: "/",
        element: <SurveysPublic />,
    },
    {
        path: "/",
        element: <DefaultLayout />, // Authorized users
        children: [
            // {
            //     path: "/dashboard",
            //     element: <Navigate to="/" />,
            // },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/display-results-admin/:user",
                element: <DisplayResultsAdmin />,
            },
            {
                path: "/surveys",
                element: <Surveys />,
            },
            {
                path: "/surveys/create",
                element: <SurveyView />,
            },
            {
                path: "/surveys/:id",
                element: <SurveyView />,
            },
            {
                path: "/answers/:id",
                element: <Answers />,
            },
            {
                path: "/get-all-answers",
                element: <Reponses />,
            },
        ],
    },

    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "/survey/public/:slug",
        element: <SurveyPublicView />,
    },
    {
        path: "/display-results",
        element: <DisplayResults />,
    },
    {
        path: "/display-results/:user",
        element: <DisplayResults />,
    },
    {
        path: "/display-results-email/:user",
        element: <DisplayResultsEmail />,
    },
    { path: "*", element: <SurveysPublic /> },
    {
        path: "/carousel",
        element: <CarouselWithContent />,
    },
]);

export default router;
