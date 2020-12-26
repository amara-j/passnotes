# Passnotes

musical passwords let you unlock a secret message board

## Usage

### Setup

1. This project connects to a MongoDB Atlas instance. Create one before starting and add your credentials to a `nodemon.json` file in the root, like this:

```javascript
{
    "env": {
        "mongo_user": "username",
        "mongo_password": "password",
        "mongo_dbname": "passnotes" //set it and forget it
    }
}
```

2. `git clone`
3. Run `npm i` from the repo's root directory

### Start

1. Run `npm start` from the repo's root directory
2. Run `index.html`

## Roadmap

Component Design
- [ ] Finish Noteboard View 1 (Noteboard) (amara)
- [x] Finish Noteboard View 2 (Password Input) (azhad)
- [ ] Finish Noteboard View 3 (View/Reply to Note) (amara)
- [ ] Build "State Toggler" in CSS (pair)

Backend
- [ ] Update messages with replies (amara)

Pre-Launch Bugfixes
- [ ] Handle failed authentication on "Create" Page (azhad)
- [ ] Button to go from "Save Note" to Noteboard ("Create" Page Frame 2) (azhad)

0.1 Deployment
- [ ] Deploy and get the app live (with infinite scroll)

0.2 Search and Pagination
- [ ] Implement search bar to lookup a note quickly
- [ ] Implement pagination (limit 8 notes per page)

0.3 Dynamic Sheet Music
- [ ] Implement realtime sheet music notation on Noteboard Frame 2

0.4 Security
- [ ] Implement hashing (& salting?)