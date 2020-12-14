function sendHttpRequest(method, url, data) {
    const promise = new Promise((resolve, reject) => {
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
    return promise
}

function getNotes() {
    const response = sendHttpRequest("GET", "http://localhost:8080/noteboard").then()
    return response
}


function saveNote() {
    const requestBody = {
        title: "Test Title",
        content: document.getElementById('saveNote').value,
        prompt: take0,
        password: take1
    }
    sendHttpRequest("POST", "http://localhost:8080/noteboard", requestBody)
        .then(response => console.log(response))
}

function getPrompt(post_id) {
    sendHttpRequest("GET", `http://localhost:8080/noteboard/${post_id}`)
        .then(response => console.log(response))
}

function verifyPassword(post_id, post_attempt) {
    const requestBody = {
        id: post_id,
        attempt: post_attempt
    }
    sendHttpRequest("POST", `http://localhost:8080/noteboard/${id}`, requestBody)
        .then(response => console.log(response))
}

function addElement(id, text) {
    const newNote = document.createElement("div");
    const newContent = document.createTextNode(text);
    newNote.setAttribute('id', `${id}`)
    newNote.setAttribute('class', 'noteboard')
    newNote.appendChild(newContent);
}

function generateNoteboard() {
    const notes = getNotes() // returns an array of note titles
    for (let i = 0; i < notes.length; i++) {
        id = notes[i]["_id"]
        text = notes[i]["title"]
        addElement(id, text)
    }
}