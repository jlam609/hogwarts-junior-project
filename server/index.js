const express = require('express')
const {seed} = require('./db')
const apiRouter = require('./api/routers')
const path = require('path')
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../dist')))

app.use('/', apiRouter)

const startServer = () => new Promise((res) => {
    app.listen(PORT, () => {
        console.log(`server is listening on port ${PORT}`)
    })
})


seed(true)
.then(startServer)