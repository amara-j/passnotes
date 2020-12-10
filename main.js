function record(authStep, recordArray) {
    authStepString = authStep.toString()
    showElement(`stopButton${authStepString}`)
    timeElapsed = 0
    isRecording = 1
    recordArray.length = 0
}

function stop(authStep, recordArray) {
    authStepString = authStep.toString()
    isRecording = 0;
    if (recordArray.length > 0) {
        recordArray = processPerformance(recordArray)
        showElement(`playButton${authStepString}`)
        showElement(`continueButton${authStepString}`)
        // updateText(`step${authStepString}Instructions`, continueTextArray[authStepString])
    }
}

function processPerformance(array) {
    let subtractMe = array[0][0]
    let relativeArray = array
    for (let i = 0; i < array.length; i++) {
        relativeArray[i][0] -= subtractMe
    }
    return relativeArray
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


function recordHelper(array, note) {
    array.push([Date.now(), note])
}


document.addEventListener('keydown', function (e) {
    let note = asciToNote[e.code];
    if (note && authStep < 4) {
        synth.triggerAttackRelease(note, 0.1)
    }
    if (note && isRecording === 1 && authStep === 1) {
        recordHelper(take0, note)
    }
    if (note && isRecording === 1 && authStep === 2) {
        recordHelper(take1, note)
    }
    if (note && isRecording === 1 && authStep === 3) {
        recordHelper(take2, note)
    }
});


function updateText(element, newText) {
    document.getElementById(element).innerHTML = newText
}

function hideElement(element) {
    document.getElementById(element).style.display = "none";
}

function showElement(element) {
    document.getElementById(element).style.display = "inline";
}

function highlightUp(element) {
    document.getElementById(element).style.opacity = 1;
}

function highlightDown(element) {
    document.getElementById(element).style.opacity = 0.1;
}

function keepTake0() {
    authStep++
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
    authStep++
    hideElement("recordButton2")
    hideElement("stopButton2")
    hideElement("playButton2")
    highlightDown("step2Text")
    hideElement("step2Instructions")
    hideElement("continueButton2")
    highlightUp("step3Text")
    showElement("recordButton3")
}

function keepTake2() {
    authStep++
    hideElement("recordButton3")
    hideElement("stopButton3")
    hideElement("playButton3")
    hideElement("continueButton3")
    console.log("AUTHENTICATION TRIGGERED")
    tryAuthentication(take1, take2)
}

function tryAuthentication(take1, take2) {
    hideElement("step1Text")
    hideElement("step2Text")
    hideElement("step3Text")
    if (authenticate(take1, take2)) {
        authStep++
        document.body.style.backgroundColor = "lightSkyBlue";
        showElement("noteTitle")
        showElement("note")
        showElement("saveNote")
    } else {
        showElement('authFailed')
        authStep-- // fix this so it actually sends user back a step
    }
}