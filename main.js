function playRiff() {
    Tone.start()
    const synth = new Tone.Synth().toDestination();
    const seq = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, 0.1, time);
        // subdivisions are given as subarrays
    }, [null, ["C5", "C5"], [null, "C5"], [null, "C5"], "B4", "D5", "C5", "G4"]).start(0);

    seq.loop = false

    // loopA.probabilityy = 1;

    Tone.Transport.start()
}

asciToNote = { 97: "C4", 115: "D4", 100: "E4", 102: "F4", 103: "G4", 104: "A4", 106: "B4", 107: "C4", 108: "D5", 59: "E5" }

document.addEventListener("keydown", function (event) {
    let asci = event.keyCode
    if (asci === 97) {
        console.log("you played a")
        //console.log(asciToNote[asci]);
    }
});
