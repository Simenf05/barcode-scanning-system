const express = require('express');
const path = require('path');

const router = express.Router()


router.use('/', (req, res, next) => {
    // auth

    if (false) {
        res.redirect('')
        res.end()
    }

    next()
})

const cwd = process.cwd()

router.use(express.static(path.join(cwd, 'build')))

router.get('*', (req, res) => {
    res.sendFile(path.join(cwd, 'build', 'index.html'), (err) => {
        if (err) {
            res.status(500).send(err)
        }
    })
});


module.exports = router;