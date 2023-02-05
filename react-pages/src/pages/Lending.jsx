import React from "react";
import { useEffect, useState } from "react";
import { Search } from "../components/Search/Search";
import { Scan } from "../components/Scan/Scan";
import { Confirm } from "../components/Confirm/Confirm";

import axios from 'axios';


export const Lending = () => {

    const [people, setPeople] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState("");
    const [selectedID, setSelectedID] = useState("");

    useEffect(() => {
        let url = '/api/people';

        (async () => {
            const res = await axios.get(url);
            
            if (res.status === 200) {
                setPeople([...res.data.people.map(person => person.toLowerCase())])
            }
        })();
    }, []); 


    

    const selectPerson = (name) => {
        if (people.includes(name)) {
            setSelectedPerson(name)
            return true;
        }
        return false;
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="m-8">Lending</h1>
            <Search className="m-3" select={selectPerson} people={people} />
        

            <p className="m-3">Selected person: {selectedPerson.charAt(0).toLocaleUpperCase() + selectedPerson.slice(1)}</p>

            {selectedPerson.length ? <Scan className="m-8" setSelected={setSelectedID} /> : <div></div>}

            {selectedID.length ? <Confirm /> : <div></div>}
            
        </div>
    )
}