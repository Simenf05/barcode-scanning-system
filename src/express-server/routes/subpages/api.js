const express = require('express');

const checkUser = require('../../handleUser').checkUser;
const authUser = require('../../handleUser').authUser;
const axios = require('axios').default;

const router = express.Router();

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

    if (req.session.user) {
        checkUser(req.session.user.username, req.session.user.password)
        .then(r => authUser(r, req, res, next))
    }

})

router.use("/", (req, res, next) => {

    (async () => {
        const d = new Date();
        console.log(`LOG:   ${d.toUTCString()}:   Call made to API.`);
    })();

    if (false) {
        res.status(401).json("Not authorized.");
    }

    next();
})


router.post('/registerProduct', (req, res) => {
    if (req.auth > 4) {
        (async () => {
            try {
                
                const response = await axios.post(`http://python-api:${api_port}/registerProduct`, {
                    person: req.body.person, itemID: req.body.itemID
                });

                if (response.data) {
                    res.json({"data": "suck"});
                    return
                }
                
                res.json({"data": "Server side error."});
            }
            catch (err) {
                console.log(err);
                res.json({ "data": "Server side error." });
            }
        })();
    }
})


router.post("/products", (req, res) => {
    if (req.auth > 4) {
        (async () => {
            try {
                const prod = await axios.get(`http://python-api:${api_port}/products/${req.body.id}`);
                const json = prod.data;
                res.json(json);
            }
            catch (err) {
                console.log(err);
                res.json({ "data": "Server side error." });
            }
        })();
    }
})


router.get("/people", (req, res) => {
    if (req.auth > 4) {
        getPeopleList()
        .then((data) => {
            res.json(data);
        })
    }
    
})

module.exports = router;