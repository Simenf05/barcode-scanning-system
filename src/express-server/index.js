const express = require('express');
const axios = require('axios').default;

const external_port = process.env.PORT_OUT;
const internal_port = process.env.WEB_PORT || 8080;
const api_port = process.env.API_PORT || 3000;


const app = express();


async function getPeopleList() {
    const people = await axios.get(`http://python-api:${api_port}`);
    const data = await people.data;
    return data;
}




app.use("/api", (req, res, next) => {

    (async () => {
        const d = new Date();
        console.log(`LOG:   ${d.toUTCString()}:   Call made to API.`);
    })();

    if (false) {
        res.status(401).json("Not authorized.");
    }

    next();
})

app.get("/api/people", (req, res) => {

    

    getPeopleList()
    .then((data) => {
        res.json(data);
    })
})



app.get("/", (req, res) => {
    res.end("hei");
})

app.listen(internal_port, () => {
    console.log(`App listening on internal port: ${internal_port} and external port: ${external_port}`);
})
