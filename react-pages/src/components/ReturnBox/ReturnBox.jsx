import React, {useEffect, useState} from "react";


export const ReturnBox = (props) => {


    console.log(props.json)
    const entries = Object.entries(props.json)
    console.log(entries)

    return (
        <div className="border border-gray-200 rounded-sm">

            {entries.map(e => <p>{e[0]}: {String(e[1])}</p>)}

        </div>
    )
}
