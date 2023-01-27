import { useState } from "react";


function Scan() {


    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" />
            </form>
        </>
    )
}


export default Scan;