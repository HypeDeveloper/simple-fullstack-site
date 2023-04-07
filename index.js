const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { connectDB } = require('./backend/config/db');
var path = require('path');
const port = process.env.PORT || 8000;

connectDB()

// inti express
const app = express()

// add Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// serve static access
// app.use(express.static(path.join(__dirname, './client')))
// app.get('*', (req, res)=>{
//     res.sendFile(path.resolve(__dirname, './','client', 'index.html'))
// })

app.use(express.static('client'))
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'client')});
})


// setup routes
app.use("/api", require("./backend/routes"));


// listen to for server
app.listen(port, () => {
    console.log(`SERVER: listening on port ${port}`);
})

module.exports = app