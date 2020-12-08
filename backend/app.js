//dependencies
const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const user = process.env.mongo_user
const pass = process.env.mongo_password
const dbname = process.env.mongo_dbname

mongoose.connect(
    "mongodb+srv://" + user + ":" + pass + "@cluster0.bf91x.mongodb.net/" + dbname + "?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

//start express
const app = express();

//route definitions
const NoteboardRoutes = require("./api/routes/noteboard");
const AuthRoutes = require("./api/routes/auth");

//middleware
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'GET, POST')
        return res.status(200).json({})
    }
    next()
})

// route requests
// localhost:8080/auth {id: id, attempt:[]}
app.use("/noteboard", NoteboardRoutes);
app.use("/auth", AuthRoutes);

// bad route error
app.use((req, res, next) => {
    const error = new Error('Not Found in API')
    error.status = 404
    next(error)
})

//error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;

/*
TODO

Sanity testing
[x] GET: Successfully send a get request from the front end to the backend.
[x] POST: Receive and parse data from a POST request from the front end, and log 
to stdout
[x] any: Deal with CORS headers so client can receive status codes

Feature development
[x] POST: "save" request that writes the data from the front end to a database
[ ] fix: eliminate id-writing for child note objects, to remove middleware
[ ] GET: "show" request that sends back all the titles and id's
[ ] POST: "select" request that sends an ID and returns the prompt for the browser 
to render
[ ] POST: "validate" request that compares attempt to true password, and returns 
content if it validates
*/