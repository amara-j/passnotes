const backBeatThreshold = 500; // amount of rhythmic difference (millisec) to allow 
const continueTextArray = ["", "Record as many times as you like until you're happy with your take.", "Press continue to save your take.", ""]
const synth = new Tone.Synth().toDestination();
const asciToNote = {
    "KeyA": "C4",
    "KeyW": "C#4",
    "KeyS": "D4",
    "KeyE": "D#4",
    "KeyD": "E4",
    "KeyF": "F4",
    "KeyT": "F#4",
    "KeyG": "G4",
    "KeyY": "G#4",
    "KeyH": "A4",
    "KeyU": "A#4",
    "KeyJ": "B4",
    "KeyK": "C5",
    "KeyO": "C#5",
    "KeyL": "D5",
    "Semicolon": "E5"
}

let prompt = []
let take1 = []
let take2 = []
let authStep = 1
let timeElapsed = 0;
let isRecording = 0;


function record(authStep, recordArray) {
    authStepString = authStep.toString()
    showElement(`stopButton${authStepString}`)
    timeElapsed = 0
    isRecording = 1
    recordArray = []
}

function recordHelper(array, note) {array.push([Date.now(), note])}

function processPerformance(array) {
    let subtractMe = array[0][0]
    let relativeArray = array
    for (let i = 0; i < array.length; i++) {
        relativeArray[i][0] -= subtractMe
    }
    return relativeArray
}

function stop(authStep, recordArray) {
    authStepString = authStep.toString()
    isRecording = 0;
    if (recordArray.length > 0) {
        processPerformance(recordArray)
        showElement(`playButton${authStepString}`)
        showElement(`continueButton${authStepString}`)
        updateText(`step${authStepString}Instructions`, continueTextArray[authStepString])
    }
}

function play(array) {
    console.log(array)
    Tone.start()
    for (let i = 0; i < array.length; i++) {
        setTimeout(function () {
            synth.triggerAttackRelease(array[i][1], 0.1)
        }, array[i][0]);
    }
}


function recordHelper(array, note) {
    array.push([Date.now(), note])
}


document.addEventListener('keydown', function (e) {
    let note = asciToNote[e.code];
    if (note && authStep < 4) {
        synth.triggerAttackRelease(note, 0.1)
    }
    if (note && isRecording === 1 && authStep === 1) {
        recordHelper(prompt, note)
        console.log("pushing to prompt")
    }
    if (note && isRecording === 1 && authStep === 2) {
        recordHelper(take1, note)
        console.log("pushing to take1")
    }
    if (note && isRecording === 1 && authStep === 3) {
        recordHelper(take2, note)
        console.log("pushing to take2")
    }
});


function updateText(element, newText) {
    document.getElementById(element).innerHTML = newText
}

function hideElement(element) {
    document.getElementById(element).style.display = "none";
}

function showElement(element) {
    document.getElementById(element).style.display = "inline";
}

function highlightUp(element) {
    document.getElementById(element).style.opacity = 1;
}

function highlightDown(element) {
    document.getElementById(element).style.opacity = 0.1;
}

function keepPrompt() {
    authStep++
    hideElement("step1Instructions")
    hideElement("recordButton1")
    hideElement("stopButton1")
    hideElement("playButton1")
    highlightDown("step1Text")
    hideElement("continueButton1")
    highlightUp("step2Text")
    highlightUp("step2Instructions")
    showElement("step2Instructions")
    showElement("recordButton2")
}

function keepTake1() {
    authStep++
    hideElement("recordButton2")
    hideElement("stopButton2")
    hideElement("playButton2")
    highlightDown("step2Text")
    hideElement("step2Instructions")
    hideElement("continueButton2")
    highlightUp("step3Text")
    showElement("step3Instructions")
    showElement("recordButton3")
}

function keepTake2() {
    authStep++
    hideElement("recordButton3")
    hideElement("stopButton3")
    hideElement("playButton3")
    // highlightDown("step3Text")
    hideElement("authButton")
    console.log("AUTHENTICATION TRIGGERED")
    tryAuthentication(take1, take2)
}

function tryAuthentication(take1, take2) {
    hideElement("step1Text")
    hideElement("step2Text")
    hideElement("step3Text")
    hideElement("authButton")
    if (authenticate(take1, take2)) {
        authenticationStep++
        document.body.style.backgroundColor = "lightSkyBlue";
        showElement("note")
        showElement("saveNote")
    } else {
        showElement('authFailed')
        authStep-- // fix this so it actually sends user back a step
    }
}