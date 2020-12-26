const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {
    authenticate
} = require('../../client/authenticate.js')

const Note = require('../models/note')

router.post('/', async (req, res, next) => {
    //step 1 - parse the request body
    var id = req.body.id
    var attempt = req.body.attempt

    //step 2 - find the matching password in the db
    const query = await Note.findById(id).select('password -_id').exec()
    const password = query.password
    if (authenticate(password, attempt)) {
        //step 3 - serve the content on a successful attempt
        const content = await Note.findById(id).select('content -_id').exec()
        res.status(200).json(content)
    } else {
        //step 4 - serve a bad response on a failed attempt
        res.status(401).json({
            message: "passwords do not match."
        })
    }
})

module.exports = router;