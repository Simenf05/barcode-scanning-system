import React from "react";

export const Confirm = (props) => {

    const onSubmit = (event) => {
        event.preventDefault()
        console.log("hei");
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input className="border" type="submit" value="Confirm" />
            </form>
        </div>
    )
}