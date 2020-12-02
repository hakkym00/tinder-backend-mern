const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const User = require('./tinderCards.js')
const app = express()
const port = process.env.PORT || 5000

mongoose.connect(process.env.MONGOURL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(result => console.log('connected to database'))
.catch(e => console.log(e.message))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send('Hello Hakkym')
})
app.post('/cards', (req, res) => {
    const dbcards = req.body
    User.create(dbcards, (err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get('/api/cards', async(req, res) => {
    try {
        const users = await User.find({})
    if(users){
        res.status(200).send(users)
    }else{
        res.status(404).send('No user found')
    }
    } catch (error) {
        res.status(500).send(error)
    }
})
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})