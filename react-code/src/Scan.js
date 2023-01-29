import { useState } from "react";


function Scan(props) {
    const [id, setId] = useState("");
    const [data, setData] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
        props.getProduct(id)
        .then((val) => setData(JSON.stringify(val)));
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" autoComplete="off" placeholder="Click and scan..." value={id} onChange={(e) => setId(e.target.value)} />
            </form>
            <p>{data}</p>
        </>
    )
}


export default Scan;