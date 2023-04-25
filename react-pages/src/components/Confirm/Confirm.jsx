import React, {useState} from "react";
import axios from "axios";

export const Confirm = (props) => {

    const [resText, setResText] = useState("");
    const [resColor, setResColor] = useState("")





    const onSubmit = (event) => {
        event.preventDefault();
        (async () => {

            let res = await axios.post('/api/registerProduct', 
            {person: props.selectedPerson, itemID: props.selectedID});

            setResText(res.data.msg);

            if (res.data.code === 0) {
                setResColor("text-yellow-400")
            }
            else if (res.data.code === 1) {
                setResColor("text-green-700")
            }
            else {
                setResColor("text-red-500")
            }

        })();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input className="border" type="submit" value="Confirm" />
            </form>
            <p className={resColor}>{resText}</p>
        </div>
    )
}
