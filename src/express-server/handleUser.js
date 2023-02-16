const axios = require('axios').default;
const api_port = process.env.API_PORT || 3000;


const checkUser = async (name, pass) => {

    try {
        const check_api = await axios.post(`http://python-api:${api_port}/checkUser`, {
            username: name,
            password: pass
        });

        return check_api.data
    }
    catch (err) {
        if (err.response) {
            if (err.response.status === 403) {
                return 403
            }
        }
        else if (err.request) {
            console.log(err.request);
            return 400
        }
        else {
            console.log(err);
            console.log(`Error: You did something wierd.`);
            return 500
        }
    }
}


const authUser = (r, req, res, next) => {

    switch (r) {
        case 403: {
            res.status(403).redirect('/login/')
            return
        }
        case 500: {
            res.status(500).redirect('/login/')
            return
        }
        case 400: {
            res.status(400).redirect('/login/')
            return
        }
    }

    if (!r.auth) {
        return
    }

    switch (r.auth) {
        case 5: {
            req.auth = 5;
            next()
            break
        }
        case 4: {
            req.auth = 4;
            next()
            break
        }
        case 3: {
            req.auth = 3;
            next()
            break
        }
    }
}


module.exports.checkUser = checkUser;
module.exports.authUser = authUser;