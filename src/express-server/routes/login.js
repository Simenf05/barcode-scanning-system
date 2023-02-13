const express = require('express');
const path = require('path');
const checkUser = require('../handleUser').checkUser;
const authUser = require('../handleUser').authUser;


const router = express.Router()

const cwd = process.cwd()

router.use(express.static(path.join(cwd, 'login', 'static')))

router.get('/', (req, res) => {
    res.sendFile(path.join(cwd, 'login', 'login.html'), (err) => {
        if (err) {
            res.status(500).send(err)
        }
    })
})

router.post('/', (req, res, next) => {

    if (!(req.body.username) || !(req.body.password)) {
        res.status(400).redirect('/login/')
        res.end()
        return
    }

    checkUser(req.body.username, req.body.password)
    .then(r => authUser(r, req, res, next))
})

router.use('/', (req, res) => {
    req.session.user = {username: req.body.username, password: req.body.password}
    res.status(200).redirect(`${req.protocol}://${req.headers.host}/`)
    res.end()
    return
})

module.exports = router;