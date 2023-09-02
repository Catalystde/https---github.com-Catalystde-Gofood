
const express = require('express')
import cors from 'cors'
const app = express()
const port = 5000
const { jwtSecret,mongoURI} = require('./config/keys')
const mongoDB = require("./db")
mongoDB();
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use('/api',require("./routes/createUser"));
app.use('/api',require("./routes/DisplayData"));
app.use('/api',require("./routes/OrderedData"));


if(process.env.NODE_ENV=='production'){
  const path = require('path')

  app.get('/',(req,res)=>{
      app.use(express.static(path.resolve(__dirname,'frontend','build')))
      res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
  })
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})