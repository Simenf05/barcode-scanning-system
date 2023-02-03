import React from "react";
import { useEffect, useState } from "react";


export const Search = (props) => {

    const [search, setSearch] = useState("");
    const [notFullMatch, setNotFullMatch] = useState([]);


    const showSearches = (searchWord) => {
        setNotFullMatch([...props.people.filter(name => name.includes(searchWord))])
    }


    const onSubmit = (event) => {
        event.preventDefault()
        if (props.select(search)) {
            //noe
        }
        else {
            showSearches(search)
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

        <div className="grid grid-cols-3"> {/* HVA FAEWN ER DETTE JEG SKJØNNER IKKE */}
            {notFullMatch.map(name => <div onClick={(e) => console.log(e.target)} key={name} value={name}>{name}</div>)}
        </div>

        </div>

        
         
        </>
    );
}