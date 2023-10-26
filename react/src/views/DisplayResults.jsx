import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "./../axios";

export default function DisplayResults() {
    const { setCurrentUser, setUserToken } = useStateContext();
    const { currentPatient, setCurrentPatient } = useStateContext();
    const [email, setEmail] = useState("");
    // const [user, setUser] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [other, setOther] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ __html: "" });

    const { user } = useParams();

    useEffect(() => {
        setLoading(true);

        if (user) {
            axiosClient
                .get(`patientData?user=${user}`)

                .then(({ data }) => {
                    setLoading(false);
                    // setSurvey(data.data);
                    console.log("data.data");
                    console.log(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            axiosClient
                .get(`available/surveys?user=${currentPatient.other}`)
                .then(({ data }) => {
                    setLoading(false);
                    // setSurvey(data.data);
                    console.log(data.data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, []);

    function getUser() {
        const { user } = useParams();

        console.log(user);
        debugger;
        return user;
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
            {/* <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <Link
                    to="/signup"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                    Signup for free
                </Link>
            </p> */}
            {error.__html && (
                <div
                    className="bg-red-500 rounded py-2 px-3 text-white"
                    dangerouslySetInnerHTML={error}
                ></div>
            )}
        </>
    );
}
