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

let take0 = []
let take1 = []
let take2 = []
let authStep = 1
let timeElapsed = 0;
let isRecording = 0;