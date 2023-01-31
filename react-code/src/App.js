import { useState, useEffect } from "react";
import Search from './Search';
import Scan from "./Scan";

function App() {

    const [loadPeople, setLoadPeople] = useState("");
    const [people, setPeople] = useState([]);
    const [selectedPeople, setSelectedPeople] = useState([]);

    useEffect(() => {
        let url = "/api/people";

        (async () => {
            const res = await fetch(url);
            if (res.ok) {
                const json = await res.json();
                setPeople([...json.people]);
                return;
            }
            setLoadPeople("Failed to load...");
        })();
    }, []);

    async function getProduct(id) {
        let url = "/api/products";
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"id": id})
        });
        const json = await res.json();
        return json;
    }

    const selectUser = (searchWord) => setSelectedPeople([...people.filter(name => name.includes(searchWord))])



    return (

        <div className="flex items-center flex-col">

            <h2>{loadPeople}</h2>

            <Search select={selectUser} people={people} />

            <ul>
                {people.map((n, i) => <li key={i}>{n}</li>)}
            </ul>

            <ul>
                {selectedPeople.map((n, i) => <li key={i}>{n}</li>)}
            </ul>

            <br/>
            <br/>

            <Scan getProduct={getProduct} />
        </div>
        
    )
}

export default App;