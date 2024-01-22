import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import TButton from "./core/TButton";

export default function PageComponent({
    title,
    buttons = "",
    children,
    image,
}) {
    return (
        <>
            <header className="bg-white shadow">
                <div className="justify-between items-center mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 pb-2">
                    {image && <img className="mr-5 h-9" src={image} />}
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        {title}
                    </h1>
                    <div
                        className="float-right button-header"
                        style={{ display: "flex", flexFlow: "row-reverse" }}
                    >
                        {buttons}
                    </div>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-1 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </>
    );
}
