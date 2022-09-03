// dependencies

const path = require('path');

// route

module.exports = function (app) {
    // get notes to return notes.html
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname,"../public/notes.html"));
    });

    // get * to return index.html
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
}

