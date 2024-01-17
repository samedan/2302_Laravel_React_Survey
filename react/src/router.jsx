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
import SurveysPublic from "./views/SurveysPublic";

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
    { path: "*", element: <SurveysPublic /> },
]);

export default router;
