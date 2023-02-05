const express = require('express');
const axios = require('axios').default;
const session = require('express-session');

const external_port = process.env.PORT_OUT;
const internal_port = process.env.WEB_PORT || 8080;
const api_port = process.env.API_PORT || 3000;


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function getPeopleList() {
    try {
        const people = await axios.get(`http://python-api:${api_port}/people`);
        const data = await people.data;
        return data;
    }
    catch (err) {
        console.log(err);
    }
}


app.use(express.static("images"));


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

app.post("/api/products", (req, res) => {
    (async () => {
        try {
            const prod = await axios.get(`http://python-api:${api_port}/products/${req.body.id}`);
            const json = prod.data;
            res.json(json);
        }
        catch (err) {
            console.log(err);
            res.json({"data": "Server side error."});
        }
    })();
})

app.post("/user/login", (req, res) => {
    console.log(req.body);

    try {
        const { username, password } = req.body

        (async () => {
            const authentication = await axios.post(`http://python-api:${api_port}/checkUser`, {
                username: username,
                password: password
            })

            if (authentication.status === 403) {
                res.status(403).send("Access denied.")
                res.end()
                return
            }

            switch (authentication.data.auth) {
                case "05": {
                    // noe cookie greier her
                }

                case "04": {

                }
                
                case "03": {

                }
            }
        })();

    }
    catch (err) {
        res.status(500).send(err)
    }
})

app.get("/api/people", (req, res) => {
    getPeopleList()
    .then((data) => {
        res.json(data);
    })
})


const oneDay = 1000;

app.use(session({
    secret: "heihei",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: oneDay
    }
}))

app.use(express.static(`${process.cwd()}/login/`))

app.use("/", (req, res, next) => {
    console.log(req.body);
    next()
})

app.use(express.static(`${process.cwd()}/build/`))

app.get('*', async (req, res) => {
    res.sendFile(`${process.cwd()}/build/index.html`, (err) => {
        if (err) {
            res.status(500).send(err)
        }
    })
});


app.listen(internal_port, () => {
    console.log(`App listening on internal port: ${internal_port} and external port: ${external_port}`);
})
