const express = require('express');
const path = require('path');
const checkUser = require('../../handleUser').checkUser;
const authForSite = require('../../handleUser').authUser;
const axios = require('axios').default;

const router = express.Router()

const api_port = process.env.API_PORT || 3000;

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

router.use('/', (req, res, next) => {
    if (!(req.auth > 4)) {
        res.status(403).redirect('/login/')
        res.end()
        return
    }

    next()
})

router.use("/api", (req, res, next) => {

    (async () => {
        const d = new Date();
        console.log(`LOG:   ${d.toUTCString()}:   Call made to API.`);
    })();

    if (false) {
        res.status(401).json("Not authorized.");
    }

    next();
})

router.post("/api/products", (req, res) => {
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

router.get("/api/people", (req, res) => {
    getPeopleList()
    .then((data) => {
        res.json(data);
    })
})

router.use('/', (req, res, next) => {

    if (!(req.session.user)) {
        res.status(403).redirect('/login/')
        res.end()
        return
    }
    
    checkUser(req.session.user.username, req.session.user.password)
    .then(r => authForSite(r, req, res, next))
})



const cwd = process.cwd()
const build_path = path.join(cwd, 'build')

router.use(express.static(build_path))

router.get('*', (req, res) => {
    res.sendFile(path.join(build_path, 'index.html'), (err) => {
        if (err) {
            res.status(500).send(err)
        }
    })
});


module.exports = router;