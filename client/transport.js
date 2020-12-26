// this JS file houses all methods/variables related to playback, stop and record

const synth = new Tone.Synth().toDestination()

function processPerformance(array) {
    let subtractMe = array[0][0]
    let relativeArray = array
    for (let i = 0; i < array.length; i++) {
        relativeArray[i][0] -= subtractMe
    }
    return relativeArray
}

function play(array) {
    for (let i = 0; i < array.length; i++) {
        setTimeout(function () {
            synth.triggerAttackRelease(array[i][1], 0.1)
        }, array[i][0]);
    }
}

export {
    processPerformance,
    play,
    synth
}