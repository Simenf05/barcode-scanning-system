const express = require('express');
const axios = require('axios').default;

const port = process.env.PORT || 8080;
const app = express();


async function getPeopleList() {
    const people = await axios.get("http://127.0.0.1:8000");
    const json = await people.data;
    return json;
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

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})
