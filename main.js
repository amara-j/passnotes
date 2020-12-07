let prompt = []
let take1 = []
let take2 = []
let authenticationStep = 1

const continueText1 = "Record as many times as you like until you're happy with your take.";
const continueText2 = "Press continue to save your take.";

const synth = new Tone.Synth().toDestination();
let timeElapsed = 0;
let isRecording = 0;

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

function record(selfID, recordArray) {
    console.log('we be generalizin')
    const buttonIndex = selfID.slice(-1);
    showElement(`stopButton${buttonIndex}`)
    timeElapsed = 0
    isRecording = 1
    recordArray = []
}


function generalizedStop(selfID, recordArray) {
    console.log('generalized stoppp')
    const buttonIndex = selfID.slice(-1);
    isRecording = 0;
    if (recordArray.length > 0) {
        processPerformance(recordArray)
        showElement(`playButton${buttonIndex}`)
        showElement(`continueButton${buttonIndex}`)
        updateText(`step${buttonIndex}Instructions`, `continueText${buttonIndex}`)
    }
}


function stopPrompt() {
    isRecording = 0
    if (prompt.length > 0) {
        processPerformance(prompt)
        showElement("playButton1")
        showElement("continueButton1")
        updateText("step1Instructions", continueText1)
    }
}

function stopTake1() {
    isRecording = 0
    if (take1.length > 0) {
        processPerformance(take1)
        showElement("playButton2")
        showElement("continueButton2")
        updateText("step2Instructions", continueText2)
        console.log(take1)
    }
}

function stopTake2() {
    isRecording = 0
    if (take2.length > 0) {
        processPerformance(take2)
        hideElement("step3Instructions")
        showElement("playButton3")
        showElement("authButton")
        console.log(take2)
    }
}

function play(array) {
    Tone.start()
    for (let i = 0; i < array.length; i++) {
        setTimeout(function () {
            synth.triggerAttackRelease(array[i][1], 0.1)
        }, array[i][0]);
    }
}


function recordHelper(array, note) { array.push([Date.now(), note]) }


document.addEventListener('keydown', function (e) {
    let note = asciToNote[e.code];
    if (note && authenticationStep < 4) {
        synth.triggerAttackRelease(note, 0.1)
    }
    if (note && isRecording === 1 && authenticationStep === 1) {
        recordHelper(prompt, note)
    }
    if (note && isRecording === 1 && authenticationStep === 2) {
        recordHelper(take1, note)
    }
    if (note && isRecording === 1 && authenticationStep === 3) {
        recordHelper(take2, note)
    }
});

function processPerformance(array) {
    let subtractMe = array[0][0]
    let relativeArray = array
    for (let i = 0; i < array.length; i++) {
        relativeArray[i][0] -= subtractMe
    }
    return relativeArray
}

const backBeatThreshold = 500; // amount of rhythmic difference (millisec) to allow 
// should we somehow be accounting for time stretches/tempo differences? :/

//function to compute the difference between two performances
function passNoteAuthenticator(original, take2,) {
    // first test: are the two arrays the same length:
    let sameLength = original.length === take2.length;
    let sameNotes = false;
    let sameRhythm = false;
    if (sameLength) { // if length is the same, check that each note is the same
        for (let i = 0; i < original.length; i++) {
            if (original[i][1] != take2[i][1]) {
                sameNotes = false
                break
            } else { sameNotes = true }
        }
    }
    if (sameLength && sameNotes) { // if length and each note are the same, check rhythm
        for (let i = 0; i < original.length; i++) {
            if (Math.abs(original[i][0] - take2[i][0]) > backBeatThreshold) {
                sameRhythm = false
                break
            } else { sameRhythm = true }
        }
        console.log("same length:", sameLength)
        console.log("same notes:", sameNotes)
        console.log("same rhythm:", sameRhythm)
        // return sameLength, sameNotes, sameRhythm
    }
    if (sameLength && sameNotes && sameRhythm) { return true }
    { return false }
}

function updateText(element, newText) { document.getElementById(element).innerHTML = newText }

function hideElement(element) { document.getElementById(element).style.display = "none"; }

function showElement(element) { document.getElementById(element).style.display = "inline"; }
function highlightUp(element) { document.getElementById(element).style.opacity = 1; }

function highlightDown(element) { document.getElementById(element).style.opacity = 0.1; }

function keepPrompt() {
    authenticationStep++
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
    authenticationStep++
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
    authenticationStep++
    hideElement("recordButton3")
    hideElement("stopButton3")
    hideElement("playButton3")
    // highlightDown("step3Text")
    hideElement("authButton")
    console.log("AUTHENTICATION TRIGGERED")
    console.log(passNoteAuthenticator(take1, take2))
    tryAuthentication(take1, take2)
}

function tryAuthentication(take1, take2) {
    hideElement("step1Text")
    hideElement("step2Text")
    hideElement("step3Text")
    hideElement("authButton")
    if (passNoteAuthenticator(take1, take2)) {
        authenticationStep++
        document.body.style.backgroundColor = "lightSkyBlue";
        showElement("note")
        showElement("saveNote")
    }
    else {
        showElement('authFailed')
        authenticationStep-- // fix this so it actually sends user back a step
    }
}



// function saveNote() {
//     var data = {
//         "prompt": prompt, 
//         "password": take1,
//         "content":,document.getElementById('note').value
//     }
//     console.log(data)

// }