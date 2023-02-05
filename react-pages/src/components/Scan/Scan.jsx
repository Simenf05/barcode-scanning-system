import React from "react";
import { useState } from "react";
import axios from 'axios';

export const Scan = (props) => {

    const [id, setId] = useState("");
    const [data, setData] = useState({});
    const [error, setError] = useState("");

    const getProduct = async (id) => {
        let url = "/api/products"

        if (id === "") {
            return;
        }

        try {

            
            const res = await axios.post(
                url,
                {"id": id}
            )
            const json = await JSON.parse(res.data)

            if (json.err) {
                setData({})
                setError(json.err)
                console.log(json.err);
                return;
            }
            
            setError("")
            setData(json);
            props.setSelected(json.ID)
        }
        catch (err) {
            setData({})
            setError(err)
            console.log(err);
            return;
        }
    }


    const onSubmit = (event) => {
        event.preventDefault()
        getProduct(id)
    }

    return (
        <div className={props.className + " text-center"}>
            <form onSubmit={onSubmit}>
                <input className="border" type="text" autoComplete="off" placeholder="Click and scan..." value={id} onChange={(e) => setId(e.target.value)} />
            </form>
            <p>{error}</p>
            <p>ID: {data["ID"]}</p>
            <p>PC modell: {data["PC modell "]}</p>
            <p>Wifi mac: {data["WiFi� MAC-adr� (IPv4)"]}</p>
            <p>Ethernet mac: {data["Ethernet MAC-adr� "]}</p>
        </div>
    )
}