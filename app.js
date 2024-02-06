const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!, dumb ass')
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})