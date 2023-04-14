import React from "react";
import {Link} from "@tanstack/react-router";

export const Home = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="m-5">Hey and welcome to my site.</h1>

            <p>Here you can go to the <Link to="/admin/Lending">Lending</Link> page </p>
        </div>
    );
}
