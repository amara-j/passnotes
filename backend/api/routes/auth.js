const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {
    authenticate
} = require('../../../frontend/authenticate.js') //how to access main.js???

const Note = require('../models/note')

router.post('/', async (req, res, next) => {
    /*
    1x. receive an _id and a password attempt.
    2x. retrieve the true password from the database
    3x. Compare the two
    4. Handle the outcome (true vs false)
    */

    //step 1
    var id = req.body.id
    var attempt = req.body.attempt

    //step 2
    const query = await Note.findById(id).select('password -_id').exec()
    const password = query.password
    //steps 3&4
    if (authenticate(password, attempt)) {
        const content = await Note.findById(id).select('content -_id').exec()
        res.status(200).json(content)
    } else {
        res.status(401).json({
            message: "passwords do not match."
        })
    }
})

module.exports = router;