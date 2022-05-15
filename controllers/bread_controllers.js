const express = require('express')
const router = express.Router()
const Bread = require('../models/bread')

// get all bread
router.get('/', (req, res) => {
    res.render('index', {
        breads: Bread,
        title: 'Bread!'
    }) //Index({ breads: Bread })
    // res.send(Bread)
})

// get bread by index
router.get('/:arrayIndex', (req, res) => {
    // const arrayIndex = req.params.arrayIndex
    const { arrayIndex } = req.params
    res.send(Bread[arrayIndex])
})

module.exports = router