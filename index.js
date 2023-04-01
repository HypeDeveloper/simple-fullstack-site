const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { connectDB } = require('./backend/config/db');

const port = process.env.PORT || 8000;

connectDB()

// inti express
const app = express()

// add Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


// setup routes
app.use("/api", require("./backend/routes"));


// serve static access
app.use(express.static('./client'))

// listen to for server
app.listen(port, () => {
    console.log(`SERVER: listening on port ${port}`);
})