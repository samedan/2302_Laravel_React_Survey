import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "./../axios";

export default function DisplayResults() {
    const { setCurrentUser, setUserToken } = useStateContext();
    const { currentPatient, setCurrentPatient } = useStateContext();
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [other, setOther] = useState("");
    const [error, setError] = useState({ __html: "" });

    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: "" });
        let patientData = {
            user,
            age,
            weight,
            height,
            other,
        };
        setCurrentPatient(patientData);
        console.log(patientData);
        console.log(currentPatient);
        // console.log(useStateContext);
        // axiosClient
        //     .post("/login", {
        //         email,
        //         password,
        //     })
        //     .then(({ data }) => {
        //         setCurrentUser(data.user);
        //         setUserToken(data.token);
        //     })
        //     .catch((error) => {
        //         if (error.response) {
        //             console.log(error.response.data);
        //             if (error.response.data.errors) {
        //                 console.log("here");
        //                 const finalErrors = Object.values(
        //                     error.response.data.errors
        //                 ).reduce((accum, next) => [...accum, ...next], []);
        //                 setError({ __html: finalErrors.join("<br>") });
        //             } else {
        //                 const finalErrors = Object.values(error.response.data);
        //                 setError({ __html: finalErrors[0] });
        //             }
        //         }
        //     });
    };
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
