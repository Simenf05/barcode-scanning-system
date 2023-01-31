import { useState } from "react";


function Search(props) {

    const [search, setSearch] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        props.select(search);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input className="border" type="search" autoComplete="off" placeholder="Search for people..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </form>
        </>
    )
}

export default Search;