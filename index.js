const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Squad Health Check App' })
})

app.get('/squads', db.getSquads)
app.get('/squads/:id', db.getSquadById)
app.post('/squads', db.createSquad)
app.put('/squads/:id', db.updateSquad)
app.delete('/squads/:id', db.deleteSquad)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
