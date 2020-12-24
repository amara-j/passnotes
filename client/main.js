//https://1000mileworld.com/Portfolio/Piano/keyboard.html

const keycodeToNote = {
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
    "KeyP": "D#5",
    "Semicolon": "E5"
}

const noteToKey = {
    "C4": "A",
    "C#4": "W",
    "D4": "S",
    "D#4": "E",
    "E4": "D",
    "F4": "F",
    "F#4": "T",
    "G4": "G",
    "G#4": "Y",
    "A4": "H",
    "A#4": "U",
    "B4": "J",
    "C5": "K",
    "C#5": "O",
    "D5": "L",
    "D#5": "P",
    "E5": ";"
}

const notesInOrder = [
    "C4", "C#4", "D4", "D#4",
    "E4", "F4", "F#4", "G4",
    "G#4", "A4", "A#4", "B4",
    "C5", "C#5", "D5", "D#5", "E5"
]

var iWhite = 0

var keyboard = document.createElement("div")
keyboard.ClassName = "keyboard"

for (var n in notesInOrder) {
    var thisNote = notesInOrder[n]
    var thisKey = document.createElement("div")
    if (thisNote.length > 2) {
        var attrs = ["black key", "30px", "120px", 40 * iWhite - 15 + "px"]
    } else {
        var attrs = ["white key", "40px", "200px", 40 * iWhite + "px"]
        iWhite++
    }
    thisKey.className = attrs[0]
    thisKey.style.width = attrs[1]
    thisKey.style.height = attrs[2]
    thisKey.style.left = attrs[3]

    keyboard.appendChild(thisKey)
}

document.body.appendChild(keyboard)