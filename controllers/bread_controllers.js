const express = require('express')
// const bread = require('../models/bread')
const router = express.Router()
const Bread = require('../models/bread')
const Baker = require('../models/baker')
const seedData = require('../models/seed')


router.get('/test/:name', async (req, res) => {
    const breads = await Bread.getBakedBy(req.params.name)
    res.render(breads)
})

router.get('/new', async (req, res) => {
    const bakers = await Baker.find()
    res.render('new', { bakers })
})


//mak new bred
router.get('/new', (req, res) => {
    res.render('new')
})

function test(req, res, next) {
    console.log('yeet')
    next()
}

//see data
router.get('/seed', test, async (req, res) => {
    try {
        await Bread.insertMany(seedData)
        res.redirect('/breads')
    } catch (error) {
        console.log(error)
        res.send("ERROR")
    }
})

// get all bread
router.get('/', async (req, res) => {
    try {
        const bread = await Bread.find()
        const bakers = await Baker.find()
        res.render('index', {
            breads: bread,
            bakers,
            title: 'Bread!'
        })
    } catch (error) {
    console.log(error)
    res.send("ERROR")
    }	
})

// get bread by index
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const bread = await Bread.findById(id).populate('baker')
        console.log(bread.bakedBy())
        res.render('show', {
            bread
        })
    } catch (error) {
        console.log(error)
        res.send("ERROR")
    }
    // const arrayIndex = req.params.arrayIndex

})

//CREATE
router.post('/', async (req, res) => {
    try {
        if(!req.body.image) {
            delete req.body['image']
        }
        if(req.body.hasGluten === 'on') {
            req.body.hasGluten = true
        } else {
            req.body.hasGluten = false
        }
    
        await Bread.push(req.body)

        res.redirect('/breads')
    } catch (error) {
        console.log(error)
        res.send("ERROR")
    }
})

//delete
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await Bread.findByIdAndDelete(id)
        res.status(303).redirect('/breads')
    } catch (error) {
        console.log(error)
        res.send("ERROR")
    }
})

// EDIT
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params
    const bread = await Bread.findById(id).populate('baker')
    const bakers = await Baker.find()
    res.render('edit', {
      bread,
      bakers
    })
})


//update bread
router.put('/:id', async (req, res) => {
    const { id } = req.params
    if(req.body.hasGluten ==='on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    await Bread.findByIdAndUpdate(id, req.body)
    res.redirect(`/breads/${id}`)
})

module.exports = router

  
