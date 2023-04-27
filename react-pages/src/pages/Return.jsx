import React, {useEffect, useState} from "react";
import axios from "axios";

import {ReturnBox} from "../components/ReturnBox/ReturnBox";

export const Return = () => {

    const [events, setEvents] = useState([])
    const [failed, setFailed] = useState("")

    useEffect(() => {
        let url = '/api/lentOutEvents';

        (async () => {
            try {
                const res = await axios.get(url);
                if (res.status === 200) {
                    setEvents(JSON.parse(res.data))
                }
            }
            catch (err) {
                console.log(err)
                setFailed("Failed to load")
            }

        })()
    }, []);


    return (
        <div className="flex items-center flex-col">
            <h1>Return</h1>

            <div className="grid grid-cols-3">
                {events.map((e, index) => <ReturnBox key={index} json={e} />)}
            </div>

            <p className="text-red-600" >{failed}</p>
        </div>
    )
}
