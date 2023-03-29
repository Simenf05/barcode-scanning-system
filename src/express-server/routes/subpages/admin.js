const express = require('express');
const path = require('path');
const checkUser = require('../../handleUser').checkUser;
const authUser = require('../../handleUser').authUser;

const router = express.Router()


router.use('/', (req, res, next) => {

    if (!(req.session.user)) {
        res.status(403).redirect('/login/')

    }
    else {
        checkUser(req.session.user.username, req.session.user.password)
        .then(r => authUser(r, req, res, next))
    }

})


router.use('/', (req, res, next) => {
    if (req.auth < 5) {
        res.status(403).redirect('/login/')
    } else {
        next()
    }
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