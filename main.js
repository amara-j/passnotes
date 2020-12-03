let prompt = []

const synth = new Tone.Synth().toDestination();

function playRiff() {
    Tone.start()
    const seq = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, 0.1, time);
        // subdivisions are given as subarrays
    }, prompt).start();
    Tone.Transport.start();

    /*
    var seq = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, 0.1, time);
        [null, ["C5", "C5"], [null, "C5"], [null, "C5"], "B4", "D5", "C5", "G4"]
    }).start(0);
    */

    seq.loop = false

    Tone.Transport.start()
}

// [null, ["C5", "C5"], [null, "C5"], [null, "C5"], "B4", "D5", "C5", "G4"] Anda da see

asciToNote = {
    "KeyA": "C4",
    "KeyS": "D4",
    "KeyD": "E4",
    "KeyF": "F4",
    "KeyG": "G4",
    "KeyH": "A4",
    "KeyJ": "B4",
    "KeyK": "C5",
    "KeyL": "D5",
    "Semicolon": "E5"
}

let isRecording = 0

function record() {
    isRecording = 1
}

function stop() {
    isRecording = 0
    console.log(prompt)
}

document.addEventListener('keydown', function (e) {
    let note = asciToNote[e.code];
    if (note && isRecording === 1) {
        synth.triggerAttackRelease(note, 0.1)
        prompt.push(note)
        // play it or somth
    }
    //console.log(asciToNote[e.code])
});






// prompt

// press the "record prompt" button
// press any key to begin recording
// press record again/stop to stop recording
// yes/no buttons: do you want to keep this as the prompt?
    // - if yes: continue, if no, return to record step

// response

// press the "record response" button
// press any key to begin recording 
// stops recording after sufficient time has passed since last key press
// user is prompted to enter their password again
// check for similarity
//      if not similar:
        //ask to reverify OR rewrite
        //else: move to the note page

// note

// give user space to write on a tacky-ass yellow notepad/sticky
// save button to save
// now, they would have to navigate to the front page, find their prompt and enter the password to see their note.


        //write prompt/password/sticky note combination to the data layer
