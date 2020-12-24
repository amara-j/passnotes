const backBeatThreshold = 500; // amount of rhythmic difference (millisec) to allow 
// should we somehow be accounting for time stretches/tempo differences? :/

//function to compute the difference between two performances
function authenticate(original, take2,) {
    // first test: are the two arrays the same length:
    let sameLength = original.length === take2.length;
    let sameNotes = false;
    let sameRhythm = false;
    if (sameLength) { // if length is the same, check that each note is the same
        for (let i = 0; i < original.length; i++) {
            if (original[i][1] != take2[i][1]) {
                sameNotes = false
                break
            } else {
                sameNotes = true
            }
        }
    }
    if (sameLength && sameNotes) { // if length and each note are the same, check rhythm
        for (let i = 0; i < original.length; i++) {
            if (Math.abs(original[i][0] - take2[i][0]) > backBeatThreshold) {
                sameRhythm = false
                break
            } else {
                sameRhythm = true
            }
        }
        console.log("same length:", sameLength)
        console.log("same notes:", sameNotes)
        console.log("same rhythm:", sameRhythm)
        // return sameLength, sameNotes, sameRhythm
    }
    if (sameLength && sameNotes && sameRhythm) {
        return true
    } {
        return false
    }
}

module.exports = {
    backBeatThreshold,
    authenticate
}