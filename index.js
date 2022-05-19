require('dotenv').config()
const express = require('express')
const breadRoutes = require('./controllers/bread_controllers')
const methodOverride = require('method-override')

const app = express()

//middleware must be above routes
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))



// routes
app.use('/breads', breadRoutes)

app.get('/', (req, res) => {
    res.send("Welcome to Bread!")
})

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`listening on port ${PORT}`))