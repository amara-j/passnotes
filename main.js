let prompt = []
let take1 = []
let take2 = []

const synth = new Tone.Synth().toDestination();

function play() {
    Tone.start()
    for (let i = 0; i < prompt.length; i++) {
        setTimeout(function () {
            synth.triggerAttackRelease(prompt[i][1], 0.1)
        }, prompt[i][0]);
    }

}

asciToNote = {
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

let timeElapsed = 0;
let isRecording = 0;

function record() {
    showElement("stopButton")
    timeElapsed = 0
    isRecording = 1
    prompt = []
}

// currently throws error if you stop before recording anything
function stop() {
    isRecording = 0
    showElement("playButton")
    processPerformance(prompt)
}

document.addEventListener('keydown', function (e) {
    let note = asciToNote[e.code];
    if (note && isRecording === 1) {
        prompt.push([Date.now(), note])
    }
    if (note) {
        synth.triggerAttackRelease(note, 0.1)
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

const backBeatThreshold = 70; // amount of rhythmic difference (millisec) to allow 
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
        return sameLength, sameNotes, sameRhythm
    }
}

function hideElement(element) {
    document.getElementById(element).style.display = "none";
}

function showElement(element) {
    document.getElementById(element).style.display = "inline";
}

function titleHighlightUp(title) {
    document.getElementById(title).style.color = "white";
    document.getElementById(title).style.border = "1px solid #FFFFFF";
}

function textHighlightUp(text) {
    document.getElementById(text).style.color = "white";
}

function highlightDown(element) {
    document.getElementById(element).style.color = "#5E5D5D";
    document.getElementById(element).style.border = "1px solid #000000";
}