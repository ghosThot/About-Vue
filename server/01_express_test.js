const express = require('express')

const server = express()

server.get('/', (req, res) => {
  res.send('index page')
})

server.listen(3030, () => {
  console.log('listen 3030');
})