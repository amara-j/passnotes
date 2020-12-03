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
    timeElapsed = 0
    isRecording = 1
    prompt = []
}

function stop() {
    isRecording = 0
    console.log(processPerformance(prompt))
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


// const original = [[0, "C4"], [734, "D4"], [1052, "D#4"], [1542, "F4"], [2043, "G4"], [2563, "G4"], [3084, "G4"]]
// const take2 = [[0, "C4"], [748, "D4"], [1001, "D#4"], [1505, "F4"], [1999, "G4"], [2513, "G4"], [3084, "G4"]]



const backBeatThreshold = 70; // amount of difference (millisec) to allow 

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

// console.log(passNoteAuthenticator(original, take2, backBeatThreshold))


// hide and show record/stop buttons
// when page is loaded: show record button 
// when record is pressed:
// show stop button
// when stop is pressed: 
// show play button and "should i keep this take" button
// when yes is pressed to keeping take, start the cycle again.