let buffer = []

let Step = class {
    constructor(id, instruction, tip) {
        this.instruction = instruction
        this.tip = tip
        this.sequence = []
        this.active = false
        // first order - the container
        this.container = document.createElement("div")
        this.container.className = "container"
        this.container.id = id
        // second order - the sides
        this.leftSide = document.createElement("div")
        this.leftSide.className = "leftSide"
        this.rightSide = document.createElement("div")
        this.rightSide.className = "rightSide"
        if (tip) {
            this.rightSide.textContent = tip
            this.rightSide.style.border = "2px solid white"
        }
        // third order - what goes in the sides
        this.instructionBox = document.createElement("div")
        this.instructionBox.className = "instructionBox"
        this.instructionBox.textContent = instruction
        this.buttonBox = document.createElement("div")
        this.buttonBox.className = "buttonBox"
        // fourth order - what goes in, what goes in the sides
        this.recordButton = document.createElement("button")
        this.recordButton.className = "record button"
        this.recordButton.textContent = "Record"
        this.playButton = document.createElement("button")
        this.playButton.className = "play button"
        this.playButton.textContent = "Play"
        this.stopButton = document.createElement("button")
        this.stopButton.className = "stop button"
        this.stopButton.textContent = "Stop"
        this.continueButton = document.createElement("button")
        this.continueButton.className = "continue button"
        this.continueButton.textContent = "Continue"
        // flex-ception: follow the chain back up
        this.buttonBox.appendChild(this.recordButton)
        this.buttonBox.appendChild(this.playButton)
        this.buttonBox.appendChild(this.stopButton)
        this.buttonBox.appendChild(this.continueButton)
        this.leftSide.appendChild(this.instructionBox)
        this.leftSide.appendChild(this.buttonBox)
        this.container.appendChild(this.leftSide)
        this.container.appendChild(this.rightSide)

        document.body.appendChild(this.container)
    }
}

window.onload = () => {
    let recordingPrompt = new Step("recordingPrompt", "Perform your musical prompt.", "Use the keyboard to practice. \n Press record when you're ready. \n When you're done, press stop.")
    let recordingPassword = new Step("recordingPassword", "Perform your musical response.", "Press record again to save a response to your prompt. Press stop when you're done.")
    let confirmingPassword = new Step("confirmingPassword", "Confirm your musical response.")
}

/*
12/31/2020 features to reimplement:
1. On start, recordingPrompt should be active and the other two states are inactive.
    - What are the definitions of active and inactive?
        - inactive = all elements are invisible except for the instructionBox, which is transparent 50% (?)
        - active = SOME elements are showing, depending on the substate:
            - Substate 1 (on load/next event): instructionBox, rightSide, and "record button" are visible"
            - Substate 2 (On clicking record): all previous elements, and "stop button" are visible
            - Substate 3 (on clicking stop): all previous elements, and play/continue buttons are visible

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