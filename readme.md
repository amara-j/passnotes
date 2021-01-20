# Passnotes

This is a proof of concept for our React implementation of Passnotes, where musical passwords let you unlock a secret message board.  View the live Passnotes version 2.0 [here](https://passnotes.herokuapp.com/)!

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
