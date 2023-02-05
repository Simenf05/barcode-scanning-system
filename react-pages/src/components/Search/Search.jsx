import React from "react";
import { useEffect, useState } from "react";


export const Search = (props) => {

    const [search, setSearch] = useState("");
    const [notFullMatch, setNotFullMatch] = useState([]);
    const [gibberish, setGibberish] = useState("");



    const onSubmit = (event) => {
        event.preventDefault()

        setNotFullMatch()

        if (props.select(search.toLowerCase())) {
            setNotFullMatch([])
            setGibberish("")
        }
        else {
            let list = [...props.people.filter(name => name.includes(search.toLowerCase()))]
            setNotFullMatch(list)
            if (!(list.length)) {
                setGibberish("No matches at all.")
                return
            }
            setGibberish("")
        }
    }


    



    return (
        <>

        <div className={props.className + ""}>
        <form onSubmit={onSubmit}>
            <input 
            className="border" 
            type="search" 
            placeholder="Search for people..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            autoFocus/>
            <input className="border" type="submit" value="Search" />
        </form>
        <div className="text-center">{gibberish}</div>
        <div className="grid grid-cols-3">
            {notFullMatch.map(name => <div value={name} className="border p-1 m-2 text-center" onClick={(e) => props.select(e.currentTarget.getAttribute('value'))} key={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</div>)}
        </div>

        </div>

        
         
        </>
    );
}