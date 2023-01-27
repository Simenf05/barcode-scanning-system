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

    const selectUser = (searchWord) => setSelectedPeople([...people.filter(name => name.includes(searchWord))])

    return (
        <>
            <h1>hei</h1>
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

            <Scan />
            
        </>
    )
}

export default App;