import React from "react";
import {Link} from "@tanstack/react-router";

export const Home = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="m-5">Hey and welcome to my site.</h1>

            <p className="m-3">Here you can go to the <Link className="text-blue-500" to="/admin/Lending">Lending</Link> page to lend out equipment to students.</p>

            <p className="m-3">Here you can go to the <Link className="text-blue-500" to="/admin/Return">Return</Link> page to return the equipment that has been used.</p>
        </div>
    );
}
