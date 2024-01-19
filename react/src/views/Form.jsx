import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Form(recipientEmail, code) {
    console.log("recipientEmail");
    console.log(recipientEmail);
    const { user, age, weight, other } = recipientEmail.currentPatient;
    const form = useRef();

    const [userEdited, setUserEdited] = useState(user);

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

    return (
        <form
            ref={form}
            onSubmit={sendEmail}
            className="mt-0 space-y-6 w-full max-w-96"
        >
            {/* <label>Name</label>
            <input type="text" name="user_name" value="dpop" />
            <label>Email</label>
            <input
                type="email"
                name="user_email"
                value="dpopescu@adelanto.fr"
            />
            <label>Message</label>
            <textarea name="message" /> */}
            <div className="-space-y-px rounded-md shadow-sm text-lg max-w-96">
                <div class="field">
                    <label htmlFor="from_name" className="sr-only_">
                        Nom Prénom
                    </label>
                    <input
                        value={userEdited}
                        type="text"
                        name="from_name"
                        id="from_name"
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
                        placeholder="Nom Prenom"
                        onChange={(e) => setUserEdited(e.target.value)}
                    />
                </div>
                <div class="field">
                    <label for="to_name">to_name</label>
                    <input type="text" name="to_name" id="to_name" />
                </div>
                <div class="field">
                    <label for="to_name">recipient</label>
                    <input
                        type="text"
                        name="recipient"
                        id="recipient"
                        value={recipientEmail.recipientEmail}
                    />
                </div>
                <div class="field">
                    <label for="to_name">code</label>
                    <input
                        type="text"
                        name="code"
                        id="code"
                        value={recipientEmail.code}
                    />
                </div>
                <div class="field">
                    <label for="message">message</label>
                    <input type="text" name="message" id="message" />
                </div>
                <div class="field">
                    <label for="reply_to">reply_to</label>
                    <input type="text" name="reply_to" id="reply_to" />
                </div>

                <input type="submit" value="Send" />
            </div>
        </form>
    );
}
