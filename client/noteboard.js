var state = 0

document.addEventListener('keydown', function (e) {
    let note = asciToNote[e.code];
    synth.triggerAttackRelease(note, 0.1);
})

function sendHttpRequest(method, url, data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.responseType = 'json'
        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json')
        }
        xhr.onload = () => {
            resolve(xhr.response)
        }
        xhr.send(JSON.stringify(data))
    })
}

async function getNotes() {
    let response = await sendHttpRequest("GET", "http://localhost:8080/noteboard")
    return response
}

async function getPrompt(post_id) {
    let response = await sendHttpRequest("GET", `http://localhost:8080/noteboard/${post_id}`)
    return response
}

function verifyPassword(post_id, post_attempt) {
    const requestBody = {
        id: post_id,
        attempt: post_attempt
    }
    sendHttpRequest("POST", `http://localhost:8080/noteboard/${id}`, requestBody)
        .then(response => console.log(response))
}

function addNoteElement(note_content_array, i) {
    const newNote = document.createElement("div");
    newNote.classList.add('note');
    id = note_content_array[i]["_id"]
    title = note_content_array[i]["title"]
    newNote.setAttribute('id', id)
    newNote.innerHTML = `<h1> ${title} <h1>`
    newNote.onclick = async function () {
        note_prompt = await getPrompt(newNote.id)
        play(note_prompt["prompt"])
    }
    noteborder.appendChild(newNote)
}

async function generateNoteboard() {
    // create invisible div as border of noteboard to append notes to
    const noteborder = document.createElement("div");
    noteborder.id = 'noteborder'
    document.body.appendChild(noteborder);
    const notes = await getNotes() // returns an array of note content
    for (let i = 0; i < notes.length; i++) {
        addNoteElement(notes, i)
    }
}

generateNoteboard()