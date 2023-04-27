const express = require('express');

const checkUser = require('../../handleUser').checkUser;
const authUser = require('../../handleUser').authUser;
const axios = require('axios').default;

const router = express.Router();

const api_port = process.env.API_PORT || 3000;


async function getPeopleList() {
    try {
        const people = await axios.get(`http://python-api:${api_port}/people`);
        return await people.data;
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

    // TODO: change this

    if (false) {
        res.status(401).json("Not authorized.");
    }

    next();
})


router.post('/registerProduct', (req, res) => {
    if (req.auth > 4) {
        (async () => {
            try {
                
                const response = await axios.post(`http://python-api:${api_port}/register_product`, {
                    person: req.body.person, itemID: req.body.itemID
                });

                if (response.data.code === 1) {
                    res.json({"code": 1, "msg": "Register successful."});
                    return;
                }
                else if (response.data.code === 0) {
                    res.json({"code": 0, "msg": "Already lent out."});
                    return;
                }
                
                res.json({ "code": -1, "msg": "Server side error." });
            }
            catch (err) {
                console.log(err);
                res.json({ "code": -1, "msg": "Server side error." });
            }
        })();
    }
})


router.post('/returnProduct', (req, res) => {
    if (req.auth > 4) {
        (async () => {
            try {
                const response = await axios.post(`http://python-api:${api_port}/returnProduct`, {
                    person: req.body.person, itemID: req.body.itemID
                })
                console.log(req.body.itemID, req.body.person)
            }
            catch (err) {
                console.log(err)
                res.json({"data": "Server side error."})
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
                console.log(json)
                res.json(json);
            }
            catch (err) {
                console.log(err);
                res.json({ "data": "Server side error." });
            }
        })();
    }
})


const sort_events = (arr) => {
    try {
        const arr2 = [...arr]
        arr2.sort((a, b) => a.time.second - b.time.second)
        arr2.sort((a, b) => a.time.minute - b.time.minute)
        arr2.sort((a, b) => a.time.hour - b.time.hour)
        arr2.sort((a, b) => a.time.day - b.time.day)
        arr2.sort((a, b) => a.time.month - b.time.month)
        arr2.sort((a, b) => a.time.year - b.time.year)
        return arr2
    }
    catch (err) {
        console.log(err)
        return null
    }
}


const remove_from_json = async (json) => {
    try {
        const json_copy = {...json}

        const product = await axios.get(`http://python-api:${api_port}/products/${json.productID}`)
        const data = await JSON.parse(product.data)

        delete json_copy["_id"]
        delete json_copy["product_mongo_id"]
        delete json_copy["type"]
        delete data["lentOut"]
        delete data["_id"]

        return {...json_copy, ...data}
    }
    catch (err) {
        console.log(err)
        return json
    }
}


// this needs optimization
router.get('/lentOutEvents', (req, res) => {
    if (req.auth > 4) {
        (async () => {
            try {

                const events = await axios.get(`http://python-api:${api_port}/onlyLendOutEvents`)
                const arr = JSON.parse(events.data)

                const new_arr = []

                for (const element of arr) {
                    const new_element = await remove_from_json(element)
                    new_arr.push(new_element)
                }

                res.json(JSON.stringify(new_arr))

            }
            catch (err) {
                console.log(err)
                res.status(500).json({"code": -1, "msg": "Server side error."})
            }
        })()
    }
})


router.get('/allEvents', (req, res) => {
    if (req.auth > 4) {
        (async () => {
            try {
                const events = await axios.get(`http://python-api:${api_port}/allEvents`)
                const json = events.data
                res.json(json)
            }
            catch (err) {
                console.log(err)
                res.status(500).json({"code": -1, "msg": "Server side error."})
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