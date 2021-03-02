const mongoose = require('mongoose')

const shortSchema = mongoose.Schema({
    baseUrl:String,
    shortUrl:String,
    clicks:Number
})

const ShortUrl = mongoose.model('ShortUrl',shortSchema)

module.exports = {ShortUrl}