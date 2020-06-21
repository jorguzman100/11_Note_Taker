// Requires
const express = require('express');
const { urlencoded } = require('body-parser');
const path = require("path");

// Port
const PORT = process.env.PORT || 3000;

// Create server / Activate Express
const app = express();


// Middleware for post methods
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Roots
app.get('/', (req, res) => {
    console.log('Root: /');
});

app.get('/notes', (req, res) => {
    console.log('Root: /notes');
});


// Functions


// Listener
app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});