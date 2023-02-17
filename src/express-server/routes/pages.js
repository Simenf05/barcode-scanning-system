const express = require('express');
const checkUser = require('../handleUser').checkUser;
const authUser = require('../handleUser').authUser;

const normal = require('./subpages/normal');
const admin = require('./subpages/admin');
const api = require('./subpages/api')

const router = express.Router();


router.use('/user', normal)
router.use('/admin', admin)
router.use('/api', api)

router.use('/', (req, res, next) => {

    if (!(req.session.user)) {
        res.status(403).redirect('/login/')
    }
    else {
        checkUser(req.session.user.username, req.session.user.password)
        .then(r => authUser(r, req, res, next))
    }
    
})

router.use('/', (req, res) => {
    switch (req.auth) {
        case 5: {
            res.status(200).redirect('/admin')
            break
        }
        case 4: {
            res.status(200).redirect('/user')
            break
        }
    }
})




module.exports = router;