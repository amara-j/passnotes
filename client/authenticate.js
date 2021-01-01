//function to compute the difference between two performances

const compareLength = (a, b) => {
    return a.length === b.length
}

const compareNotes = (a, b) => {
    for (let i = 0; i < a.length; i++) {
        if (a[i][1] != b[i][1]) {
            return false
        }
        return true
    }
}

const compareRhythm = (a, b, threshold) => {
    for (let i = 0; i < a.length; i++) {
        if (Math.abs(a[i][0] - b[i][0]) > threshold) {
            return false
        }
        return true
    }
}

function authenticate(a, b) {
    // we are now coupling the threshold with the function definition to minimize exports
    const backBeatThreshold = 500;
    // first test: are the two arrays the same length:
    let sameLength = compareLength(a, b);
    if (sameLength === false) {
        return false
    }
    let sameNotes = compareNotes(a, b)
    if (sameNotes === false) {
        return false
    }
    let sameRhythm = compareRhythm(a, b)
    if (sameRhythm === false) {
        return false
    }
    return true
}

// frontend-backend switcharoo
export default authenticate