const express = require('express')
const app = express();

const connectDb = require('./db');

connectDb();

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)
