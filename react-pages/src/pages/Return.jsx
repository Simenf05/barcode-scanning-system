import React, {useEffect, useState} from "react";
import axios from "axios";


export const Return = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        let url = '/api/lentOutEvents';

        (async () => {
            const res = await axios.get(url);

            console.log(res.status)
            console.log(res.data)

            if (res.status === 200) {
                setEvents(res.data)
            }
        })()

    }, []);




    return (
        <div className="flex justify-center">
            <h1>Return</h1>

            <p>{events}</p>

        </div>
    )
}