const express = require('express');
const path = require('path');
const checkUser = require('../../handleUser').checkUser;
const authUser = require('../../handleUser').authUser;

const router = express.Router();


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
    if (!(req.auth > 3)) {
        res.status(403).redirect('/login/')
        
    }
    else {
        next()
    }
    
})

const cwd = process.cwd()
const FAQ_path = path.join(cwd, 'FAQ')

router.use(express.static(FAQ_path))

module.exports = router;

