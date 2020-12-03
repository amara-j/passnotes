let prompt = []

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
        synth.triggerAttackRelease(note, 0.1)
        prompt.push([Date.now(), note])
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