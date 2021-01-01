import {
    keycodeToNote
} from "./constants.js"

import {
    synth,
    play,
    processPerformance
} from "./transport.js"

import authenticate from "./authenticate.js"

let buffer = []
let recording = false

let NoteUI = class {
    constructor(id) {
        this.id = id
        this.container = document.createElement("div")
        this.container.className = "noteUI"

        this.titleTextBox = document.createElement("textarea")
        this.titleTextBox.className = "note"
        this.titleTextBox.id = "titleContent"
        this.titleTextBox.placeholder = "write a title for your note here"

        this.noteTextBox = document.createElement("textarea")
        this.noteTextBox.className = "note"
        this.noteTextBox.id = "noteContent"
        this.noteTextBox.placeholder = "write a message here! It will be protected by your musical password."

        this.saveButton = document.createElement("button")
        this.saveButton.textContent = "Save"
        this.saveButton.className = "save"

        this.container.appendChild(this.titleTextBox)
        this.container.appendChild(this.noteTextBox)
        this.container.appendChild(this.saveButton)

        document.body.appendChild(this.container)
    }
}

let Step = class {
    constructor(id, instruction, tip) {
        this.instruction = instruction
        this.tip = tip
        this.sequence = []
        this.active = false

        // first layer - the container
        this.container = document.createElement("div")
        this.container.className = "container"
        this.container.id = id

        // second layer - the sides
        this.leftSide = document.createElement("div")
        this.leftSide.className = "leftSide"
        this.rightSide = document.createElement("div")
        this.rightSide.className = "rightSide"
        if (tip) {
            this.rightSide.textContent = tip
            this.rightSide.style.border = "2px solid white"
        }

        // third layer - what goes in the sides
        this.instructionBox = document.createElement("div")
        this.instructionBox.className = "instructionBox"
        this.instructionBox.textContent = instruction
        this.buttonBox = document.createElement("div")
        this.buttonBox.className = "buttonBox"

        // fourth layer - what goes in what goes in the sides
        this.recordButton = document.createElement("button")
        this.recordButton.className = "record button"
        this.recordButton.textContent = "Record"
        this.recordButton.onclick = () => {
            recording = true
            buffer.length = 0
            this.activate(1)
        }

        this.stopButton = document.createElement("button")
        this.stopButton.className = "stop button"
        this.stopButton.textContent = "Stop"
        this.stopButton.onclick = () => {
            recording = false
            processPerformance(buffer)
            this.activate(2)
        }

        this.playButton = document.createElement("button")
        this.playButton.className = "play button"
        this.playButton.textContent = "Play"
        this.playButton.onclick = () => {
            play(buffer)
        }

        this.continueButton = document.createElement("button")
        this.continueButton.className = "continue button"
        this.continueButton.textContent = "Continue"

        // flex-ception: follow the chain back up
        this.buttonBox.appendChild(this.recordButton)
        this.buttonBox.appendChild(this.stopButton)
        this.buttonBox.appendChild(this.playButton)
        this.buttonBox.appendChild(this.continueButton)

        this.leftSide.appendChild(this.instructionBox)
        this.leftSide.appendChild(this.buttonBox)

        this.container.appendChild(this.leftSide)
        this.container.appendChild(this.rightSide)

        document.body.appendChild(this.container)
    }

    //tip setter that also enables/disables the white border

    deactivate() {
        this.rightSide.style.visibility = "hidden"
        this.recordButton.style.visibility = "hidden"
        this.stopButton.style.visibility = "hidden"
        this.playButton.style.visibility = "hidden"
        this.continueButton.style.visibility = "hidden"
        this.instructionBox.style.opacity = "0.3"
    }

    activate(state) {
        if (this.rightSide.style.visibility === "hidden") {
            this.rightSide.style.visibility = "visible"
            this.recordButton.style.visibility = "visible"
            this.instructionBox.style.opacity = "1"
        }
        if (state === 1) {
            this.stopButton.style.visibility = "visible"
            this.playButton.style.visibility = "hidden"
            this.continueButton.style.visibility = "hidden"
        }
        if (state === 2) {
            this.stopButton.style.visibility = "visible"
            this.playButton.style.visibility = "visible"
            this.continueButton.style.visibility = "visible"
        }
    }
}

window.onload = () => {
    document.body.className = "goth"
    let recordingPrompt = new Step("recordingPrompt", "Perform your musical prompt.", "Use the keyboard to practice. \n Press record when you're ready. \n When you're done, press stop.")
    let recordingPassword = new Step("recordingPassword", "Perform your musical response.", "Press record again to save a response to your prompt. Press stop when you're done.")
    let confirmingPassword = new Step("confirmingPassword", "Confirm your musical response.")

    const saveBufferTo = step => {
        step.sequence = [...buffer]
        buffer.length = 0
    }
    recordingPrompt.continueButton.onclick = () => {
        saveBufferTo(recordingPrompt)
        recordingPrompt.deactivate()
        recordingPassword.activate()
    }

    recordingPassword.continueButton.onclick = () => {
        saveBufferTo(recordingPassword)
        recordingPassword.deactivate()
        confirmingPassword.activate()
    }

    confirmingPassword.continueButton.onclick = () => {
        saveBufferTo(confirmingPassword)
        // authenticate between the first and second attempt
        let passwordsMatch = authenticate(recordingPassword.sequence, confirmingPassword.sequence)
        if (passwordsMatch) {
            // handle going to next screen here
            console.log(confirmingPassword.sequence)
            document.body.innerHTML = ''
            document.body.className = "writeNote"
            let noteui = new NoteUI("writeNote")
            document.removeEventListener("keydown", playKeyboard)
        } else {
            confirmingPassword.rightSide.textContent = "Passwords do not match. Try recording again."
            confirmingPassword.rightSide.style.border = "2px solid red"
            confirmingPassword.rightSide.style.color = "red"
        }
    }

    recordingPrompt.deactivate()
    recordingPassword.deactivate()
    confirmingPassword.deactivate()

    recordingPrompt.activate()
}

const playKeyboard = keyPressed => {
    let note = keycodeToNote[keyPressed.code]
    if (note) {
        if (recording) {
            buffer.push([Date.now(), note])
        }
        synth.triggerAttackRelease(note, 0.1)
    }
}

document.addEventListener('keydown', playKeyboard)

/*
12/31/2020 features to reimplement:
1. On start, recordingPrompt should be active and the other two states are inactive.
    - What are the definitions of active and inactive?
        - inactive = all elements are invisible except for the instructionBox, which is transparent 50% (?)
        - active = SOME elements are showing, depending on the substate:
            - Substate 1 (on load/next event): instructionBox, rightSide, and "record button" are visible"
            - Substate 2 (On clicking record): all previous elements, and "stop button" are visible
            - Substate 3 (on clicking stop): all previous elements, and play/continue buttons are visible
    - What are the functionalities of each button:
        - Record: clear the buffer, and start writing notes to it.
        - Stop: stop writing to the buffer
        - Play: play the buffer
        - Continue: 
            in the case of recordingPrompt and recordingPassword:
            - save the buffer to the Step's this.buffer property
            - activate the next Step (method argument?)
            - and deactivate the current Step.
            in the case of confirmingPassword:
            - save the buffer to the Step's this.buffer property
            - validate recordingPassword's buffer against confirmingPassword's buffer
            - if the validation is successful: scrap everything in the body and render the note-writing page
            - else: tell the user the passwords do not match
                - nice-to-have: give the user a chance to play the old password
2. How to transition from password-playing screen to note-taking screen
    - remove the three Step containers from the DOM.
    - change the class of the body to "writeNote"
         - baby blue background
         - place to title note
         - place to write note
         - save button

create.js Redesign.

Three flexbox divs, one for each state.
When the div isn't enabled, some of the elements are hidden, some are

State Map:

1. prompt instructions (hit record) ->
2. Recording newPrompt (hit stop) ->
3. Playback newPrompt (hit continue) ->

4. password instructions (hit record) ->
5. Recording newPassword (hit stop) ->
6. Playback newPassword (hit continue) ->

7. confirm password (hit record) ->
8. Recording confirmPassword (hit stop) ->
9. Playback confirmPassword (hit continue) ->

10. Leave Note (hit save)

if (recording) will be used for substate 2

Design thoughts - create will by its own html page in the site layout.
But for noteboard, verify and view, each will be implemented in their own
divs, the divs will take up the entire viewport, and be toggled on and off
using the body technique introduced by David T.

"Step" is the parent class that implements the rest of the UI. Steps each contain
their own instructions and tips, but the positioning of the text and playback buttons
is identical. 

By calling the setStep() method in the source code, we can toggle between the 
different steps. For example, the "Continue" button for the recordingPrompt
step is responsible for:
 - saving the buffer to that step's .sequence property
 - deactivating the recordingPrompt step
 - clearing the buffer
 - activating the recordingPassword step
I imagine the onClick methods for this "continue" button will be have to set at 
runtime, not on class definition? We'll see.

Step Design Process
1. What is important about the "container"?
    - it is a flexbox
    - it has a total width of about 80% of the viewport
    - it's height is relative to the total number of containers on the screen
        - in a perfect world this is implicit and not hard-coded, but it can be
        hard-coded to get it done faster
        - an implicit version would have to count how many instances of a class
        exist and backfeed that data to the instances?
    - the layout is 
2. What is important about the "rightSide" and "leftSide"?
    - the right side is a flexbox, for the left side it doesn't matter
    - The width of the right side takes up 55% of whatever it is in, leaving the
    remaining 45% to the left side
    - the sides share the same height as the parent container, margin is optional
3. What is important about the "instructionBox"?
    - Not much, it basically holds left-justified text
    - its height is 55% of the height of the parent container, leaving 45% for 
    buttonBox, width the same as parent
4. What is important about the "buttonBox"?
    - it's another, you guessed it, flexbox
    - see width/height from step 3
    - its elements are left-justified
5. What is important about the buttons?
    - they have different colors
    - their onclick methods can be set at runtime, not definition
    - like linkedLists, they can point to other step objects
        - does this mean the initialization order of those objects is non-arbitrary?
*/