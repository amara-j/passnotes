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
    sendHttpRequest("GET", "http://localhost:8080/noteboard")
        .then(response => console.log(response))
}

function saveNote() {
    const requestBody = {
        title: document.getElementById('noteTitle').value,
        content: document.getElementById('note').value,
        prompt: take0,
        password: take1
    }
    sendHttpRequest("POST", "http://localhost:8080/noteboard", requestBody)
        .then(response => console.log(response))
}

async function getPrompt(post_id) {
    let response = await sendHttpRequest("GET", `http://localhost:8080/noteboard/${post_id}`)
    return response
}

async function verifyPassword(post_id, post_attempt) {
    const requestBody = {
        id: post_id,
        attempt: post_attempt
    }
    let response = await sendHttpRequest("POST", `http://localhost:8080/auth/`, requestBody)
    return response
}

export {
    getNotes,
    saveNote,
    getPrompt,
    verifyPassword
}