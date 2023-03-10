import React from "react";
import axios from "axios";

export const Confirm = (props) => {

    const onSubmit = (event) => {
        event.preventDefault();
        (async () => {

            let res = await axios.post('/api/registerProduct', 
            {person: props.selectedPerson, itemID: props.selectedID});

            console.log(res);
            
        })();
        
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input className="border" type="submit" value="Confirm" />
            </form>
        </div>
    )
}