const express = require('express')
const app = express();

app.use(express.json()); // this middleware parse the json data in every request automatically

const connectDb = require('./db');

connectDb();

app.get('/', function (req, res) {
  res.send('Hello World')
});

require('./routes/auth.route')(app);

app.listen(3000)
