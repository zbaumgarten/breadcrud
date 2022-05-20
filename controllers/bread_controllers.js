const express = require('express')
const router = express.Router()
const Bread = require('../models/bread')


//mak new bred
router.get('/new', (req, res) => {
    res.render('new')
})

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
    res.render('show', {
        bread: Bread[arrayIndex],
        index: arrayIndex
    })
})

//CREATE
router.post('/', (req, res) => {
    if (!req.body.image) {
        req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    }
    // console.log("BODY ", req.body)
    //make new bread and push into existing bread array
    if(req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }

    Bread.push(req.body)
    res.redirect('/breads')
})

//delete
router.delete('/:arrayIndex', (req, res) => {
    Bread.splice(req.params.arrayIndex, 1)
    res.status(303).redirect('/breads')
})

// EDIT
breads.get('/:indexArray/edit', (req, res) => {
    res.render('edit', {
      bread: Bread[req.params.indexArray],
      index: req.params.indexArray
    })
})


//update bread
router.put('/:arrayIndex', (req, res) => {
    if(req.body.hasGluten ==='on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread[arrayIndex] = req.body
    res.redirect(`/breads/${arrayIndex}`)
})

module.exports = router

  
