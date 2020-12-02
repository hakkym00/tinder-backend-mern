const mongoose = require('mongoose')
const tinderCardsSchema = new mongoose.Schema({
    name: String,
    image: String
})

const User = mongoose.model('User', tinderCardsSchema)

module.exports = User