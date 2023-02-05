const express = require('express');
const router = express.Router()



router.use(express.static('../login'))

router.post('/', (req, res) => {
    
})

module.exports = router;