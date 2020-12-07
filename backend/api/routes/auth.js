const express = require('express')
const router = express.Router()
//const passNoteAuthenticator = require('../../../main.js') //how to access main.js???

const Note = require('../models/note')

router.post('/', (req, res, next) => {
    /*
    1x. receive an _id and a password attempt.
    2x. retrieve the true password from the database
    3. Compare the two
    4. Handle the outcome (matching vs non-matching)
    */
    const id = req.body.id
    const attempt = req.body.attempt

    const match = Note.findById(id)
        .select('password')
        .exec()
        .then(password => {
            //console.log(passNoteAuthenticator(password, attempt))
            res.status(200).json({
                status: 'check the console dummy'
            })
        })
})

module.exports = router;