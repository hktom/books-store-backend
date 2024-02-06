const express = require('express')
const db = require('./src/helpers/db')
const app = express()
const port = 3000


app.use(express.static('public'))

try {
  db.authenticate().then((res)=>{
    console.log('Connection has been established successfully.');
  })
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.get('/', (req, res) => {
  res.send('Hello World!, dumb ass')
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})