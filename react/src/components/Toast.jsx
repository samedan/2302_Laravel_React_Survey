import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

export default function Toast() {
    const { toast, setToast } = useStateContext();
    return (
        <>
            {toast.show && (
                <div className="w-[300px] py-2 px-3  text-white rounded bg-emerald-500 fixed right-2 bottom-2 z-40 animate-fade-in-down">
                    <a href="#" onClick={() => setToast({ show: false })}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6  z-50 float-right"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </a>
                    {toast.message}
                </div>
            )}
        </>
    );
}
