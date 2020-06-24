// Requires
const express = require('express');
const { urlencoded } = require('body-parser');
const path = require("path");

// Database
// The application should have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.
let db = require('./db/db.json');
const fs = require('fs');


// Port
const PORT = process.env.PORT || 3000;

// Create server / Activate Express
const app = express();


// Middleware for post methods
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public')); // For everything is running in the frontend, use this folder


// HTML Routes

// GET `*` - Should return the `index.html` file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
    console.log('Root: /');
});

// GET `/notes` - Should return the `notes.html` file.
app.get('/notes', (req, res) => {
    console.log('Root: /notes');
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// API Routes

// GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get(`/api/notes`, (req, res) => {
    console.log('Database: ', db);
    res.json(db);
});

// POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    db.push(newNote);
    fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(db), (err) => {
        if (err) {
            throw err;
        }
    });
    console.log('Database: ', db);
    res.json(db);
});

// DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file. */
app.get(`/api/notes/:id`, (req, res) => {
    let id = req.params.id;

    console.log('id: ', id);

    for (var i = 0; i < db.length; i++) {
        if (id === db[i].id) {
            db = db.filter((note) => {
                console.log('note.id: ' + note.id + '   id: ' + id);
                return note.id != id;
            });
            console.log('db: ', db);
            fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(db), (err) => {
                if (err) {
                    throw err;
                }
            });
            return res.json(db);
        }
    }
    return res.json(false);
});



// Functions


// Listener
app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});