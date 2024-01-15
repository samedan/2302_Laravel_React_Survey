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
            user: "NA",
            age: "NA",
            weight: "NA",
            height: "NA",
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
            <div>
                {/* <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Sign in to your account
                </h2> */}
            </div>

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
                className="mt-8 space-y-6"
                action="#"
                method="POST"
            >
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                    <p>
                        Les champs de données à remplir ne sont pas
                        obligatoires. Si vous voulez garder les résultats de
                        l'étude, vous devez remplir les champs{" "}
                        <strong>Email</strong> et/ou{" "}
                        <strong>Téléphone mobile</strong>.
                    </p>
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
                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Nom Prenom"
                        />
                    </div>
                    <div>
                        {/* <label htmlFor="age" className="sr-only">
                            Age
                        </label> */}
                        <input
                            id="age"
                            name="age"
                            type="text"
                            // autoComplete="email"
                            value={age}
                            onChange={(ev) => setAge(ev.target.value)}
                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Age"
                        />
                    </div>
                    <div>
                        {/* <label htmlFor="weight" className="sr-only">
                            weight
                        </label> */}
                        <input
                            id="weight"
                            name="weight"
                            type="text"
                            // autoComplete="email"
                            value={weight}
                            onChange={(ev) => setWeight(ev.target.value)}
                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <label htmlFor="height" className="sr-only">
                            height
                        </label>
                        <input
                            id="height"
                            name="height"
                            type="text"
                            // autoComplete="email"
                            value={height}
                            onChange={(ev) => setHeight(ev.target.value)}
                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Tél mobile"
                        />
                    </div>
                    {/* <div>
                        <label htmlFor="other" className="sr-only">
                            other
                        </label>
                        <input
                            id="other"
                            name="other"
                            type="text"
                            // autoComplete="email"
                            value={other}
                            // onChange={(ev) => setOther(ev.target.value)}
                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Nom Prenom other"
                            readOnly
                        />
                    </div> */}

                    {/* <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                            autoComplete="current-password"
                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password"
                        />
                    </div> */}
                </div>

                {/* <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                            htmlFor="remember-me"
                            className="ml-2 block text-sm text-gray-900"
                        >
                            Remember me
                        </label>
                    </div>
                </div> */}

                <div>
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon
                                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                aria-hidden="true"
                            />
                        </span>
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
}
