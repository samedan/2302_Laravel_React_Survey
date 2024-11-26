import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "./../axios";

export default function PatientData() {
    const { setCurrentUser, setUserToken } = useStateContext();
    const { currentPatient, setCurrentPatient } = useStateContext();
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [other, setOther] = useState("");
    const [error, setError] = useState({ __html: "" });

    const handleRandomNum = () => {
        // setRandomNum(Math.floor(Math.random() * (maxVal - minVal + 1) + minVal));
        let x = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
        setOther(x);
    };

    useEffect(() => {
        handleRandomNum();
    }, []);

    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: "" });
        let patientData = {
            user: user || "NAx",
            age: age || "NAx",
            weight: weight || "NAx",
            height: height || "NAx",
            other: other,
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
            <form
                onSubmit={onSubmit}
                className="mt-0 space-y-6 w-full max-w-96"
                action="#"
                method="POST"
            >
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm text-lg max-w-96">
                    <p></p>
                    <div>
                        {/* <label htmlFor="user" className="sr-only_">
                            Nom Prénom
                        </label> */}
                        <input
                            id="user"
                            name="user"
                            type="text"
                            // autoComplete="email"
                            value={user}
                            onChange={(ev) => setUser(ev.target.value)}
                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
                            placeholder="Nom Prenom"
                        />
                    </div>

                    {/* <label htmlFor="age" className="sr-only">
                            Age
                        </label> */}
                    {/* <div>
                       
                        <input
                            id="age"
                            name="age"
                            type="text"
                            
                            value={age}
                            onChange={(ev) => setAge(ev.target.value)}
                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
                            placeholder="Age"
                        />
                    </div> */}

                    {/* <!-- EMAIL --> */}
                    {/* <div>
                       
                        <input
                            id="weight"
                            name="weight"
                            type="text"
                            // autoComplete="email"
                            value={weight}
                            onChange={(ev) => setWeight(ev.target.value)}
                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
                            placeholder="Email"
                        />
                    </div> */}

                    {/* <!-- END EMAIL --> */}
                </div>

                <div>
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-lg">
                            <LockClosedIcon
                                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                aria-hidden="true"
                            />
                        </span>
                        <span className="text-lg">Valider</span>
                    </button>
                </div>
            </form>
        </>
    );
}
