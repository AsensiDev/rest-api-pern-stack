import express from 'express'

const server = express()

// routing
server.get('/', (req, res) => {

    res.json('desde get')
})

server.post('/', (req, res) => {

    res.json('desde post')
})

server.put('/', (req, res) => {

    res.json('desde put')
})

server.patch('/', (req, res) => {

    res.json('desde patch')
})

server.delete('/', (req, res) => {

    res.json('desde delete')
})

export default server