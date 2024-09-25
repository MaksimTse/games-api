const express = require('express')
const app = express()
const port = 8080
const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load('./docs/swagger.yaml');

app.use(express.json())

const games = [
    {id: 1, name: "Witcher 3", price: 29.99},
    {id: 2, name: "STALCRAFT:X", price: 0.99},
    {id: 3, name: "Minecraft", price: 22.99},
    {id: 4, name: "CS 2", price: 9.99},
    {id: 5, name: "Roblox", price: 0},
    {id: 6, name: "Genshin Impact", price: 0},
    {id: 7, name: "Valorant", price: 11.99},
    {id: 8, name: "GTA V", price: 49.99}
]

app.get('/games/:id', (req, res) => {
    if (typeof games[req.params.id - 1] === 'undefined') {
        res.status(404).send('Game not found with id ' + req.params.id)
    }
    res.send(games[req.params.id - 1])
})

app.get('/games', (req, res) => {
    games.push({
        id: games.length + 1,
        name: req.body.name,
        price: req.body.price
    })

    res.end()
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}/games`)
})