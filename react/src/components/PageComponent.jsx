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
                <div className=" flex justify-between items-center mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    {image && <img className="mr-5" src={image} />}
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        {title}
                    </h1>
                    {buttons}
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </>
    );
}
