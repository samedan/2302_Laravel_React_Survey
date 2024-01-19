import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import emailjs from "@emailjs/browser";
export default function PatientDataFinal(currentPatientFinal) {
    console.log("currentPatientFinal");
    console.log(currentPatientFinal);
    // console.log("currentPatientFinal.other");
    // console.log(currentPatientFinal.currentPatient.other);
    const { setCurrentUser, setUserToken } = useStateContext();
    const { currentPatient, setCurrentPatient } = useStateContext();
    const [email, setEmail] = useState("");
    const [user, setUser] = useState(currentPatientFinal.currentPatient.user); //Nom Prenom
    const [age, setAge] = useState(currentPatientFinal.currentPatient.age); // Age
    const [weight, setWeight] = useState(
        currentPatientFinal.currentPatient.weight
    ); // Email
    const [height, setHeight] = useState("");
    const [other, setOther] = useState(
        currentPatientFinal.currentPatient.other
    );
    const [error, setError] = useState({ __html: "" });

    // Send email //
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        console.log(form.current);

        emailjs
            // .sendForm(
            //     "YOUR_SERVICE_ID",
            //     "YOUR_TEMPLATE_ID",
            //     form.current,
            //     "YOUR_PUBLIC_KEY"
            // )
            .sendForm(
                "service_r7htw3c",
                "template_bn603m5",
                form.current,
                "d-KnZYpZeSh32IPp8"
            )
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };

    const onSubmit = (ev) => {
        ev.preventDefault();

        console.log("form.current");
        console.log(form.current);
        setError({ __html: "" });
        let patientData = {
            user: user,
            age: age,
            weight: weight,
            height: height || "NA",
            other: other,
        };
        setCurrentPatient(patientData);
        // console.log(patientData);
        // console.log(currentPatient);
        // emailjs
        //     // .sendForm(
        //     //     "YOUR_SERVICE_ID",
        //     //     "YOUR_TEMPLATE_ID",
        //     //     form.current,
        //     //     "YOUR_PUBLIC_KEY"
        //     // )
        //     .sendForm(
        //         "service_r7htw3c",
        //         "template_bn603m5",
        //         form.current,
        //         "d-KnZYpZeSh32IPp8"
        //     )
        //     .then(
        //         (result) => {
        //             console.log(result.text);
        //         },
        //         (error) => {
        //             console.log(error.text);
        //         }
        //     );
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
        currentPatientFinal && (
            <>
                {error.__html && (
                    <div
                        className="bg-red-500 rounded py-2 px-3 text-white"
                        dangerouslySetInnerHTML={error}
                    ></div>
                )}
                <form
                    ref={form}
                    onSubmit={sendEmail}
                    className="mt-0 space-y-6 w-full max-w-96"
                >
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm text-lg max-w-96">
                        <p></p>
                        <div>
                            <label htmlFor="user" className="sr-only_">
                                Nom Prénom
                            </label>
                            <input
                                id="to_name"
                                name="user"
                                type="text"
                                // autoComplete="email"
                                value={user}
                                onChange={(ev) => setUser(ev.target.value)}
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
                                placeholder="Nom Prenom"
                            />
                        </div>
                        <div>
                            <label htmlFor="age" className="sr-only_">
                                Age
                            </label>
                            <input
                                id="age"
                                name="age"
                                type="text"
                                // autoComplete="email"
                                value={age}
                                onChange={(ev) => setAge(ev.target.value)}
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
                                placeholder="Age"
                            />
                        </div>

                        <div>
                            <label htmlFor="weight" className="sr-only_">
                                Email
                            </label>
                            <input
                                id="recipient"
                                name="weight"
                                type="text"
                                // autoComplete="email"
                                value={weight}
                                onChange={(ev) => setWeight(ev.target.value)}
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
                                placeholder="Email"
                            />
                            <input hidden id="code" value={other} />
                        </div>
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
        )
    );
}
