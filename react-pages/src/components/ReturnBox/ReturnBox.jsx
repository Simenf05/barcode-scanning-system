
export const ReturnBox = (props) => {


    console.log(props.json)
    const obj = props.json
    const time = obj.time
    const entries = Object.entries(props.json)
    console.log(entries)

    

    const myDate = new Date(time.year, time.month, time.day, time.hour, time.minute, time.second)

    const formattedDateTime = `${myDate.getFullYear()}-${(myDate.getMonth() + 1).toString().padStart(2, '0')}-${myDate.getDate().toString().padStart(2, '0')} ${myDate.getHours().toString().padStart(2, '0')}:${myDate.getMinutes().toString().padStart(2, '0')}:${myDate.getSeconds().toString().padStart(2, '0')}`;


    return (
        <div className="border border-gray-200 rounded-sm flex flex-col items-center p-5">

            <h1>{obj["PC modell "]}</h1>

            <p>Lent out: {formattedDateTime}</p>

            

            {/*entries.map(e => <p>{e[0]}: {String(e[1])}</p>)*/}

        </div>
    )
}
