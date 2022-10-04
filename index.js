const express = require('express')
const cors = require('cors');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
    res.send('Hello Facility Server')
  })
  
  app.listen(port, () => {
    console.log(`Hello Facility listening on port ${port}`)
  })