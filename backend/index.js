const express = require('express')
const cors = require('cors')
const {nanoid} = require('nanoid')
const bodyParser = require('body-parser')
const {ShortUrl} = require('./data.js')
const mongoose = require('mongoose')
const app = express()
app.use(cors({origin:'*'}))
app.use(express.json())
const mdbUrl = 'mongodb://localhost/shortdb'
mongoose.connect(mdbUrl,{ useNewUrlParser: true ,useUnifiedTopology: true}).then(()=>console.log("connection successfull")).catch(err=>console.log(err))
const port = process.env.PORT || 3000
app.get('/',(req,res)=>{
  res.send('Hello World')
})
app.post('/short', (req, res) => {
    const myUrl = ShortUrl({baseUrl:req.body.baseUrl,shortUrl:nanoid(8),clicks:0})
    myUrl.save().then(()=>console.log('Data saved')).catch(err=>console.log(err))
    res.send(`http://localhost:${port}/short/${myUrl.shortUrl}`)
})
app.get('/short/:shortId',(req,res)=>{
  const id = req.params.shortId;
  ShortUrl.findOne({shortUrl:id},(err,doc)=>{
    if(doc == null){
      res.status(404).send('Invalid Short Id')
    }else{
      res.redirect(`https://${doc.baseUrl}`)
    }
  })
})
app.listen(port,()=>console.log(`listening on port ${port}`))