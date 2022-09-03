const fs = require ('fs');

module.exports = function (app) {
    // application will talks to a db.json file to store and retrieve notes

    // get for /api/notes -
    app.get("api/notes", function (req, res) {
        console.log("Getting your notes...")
        fs.readFile("db/db.json", "utf-8", (err, data) => {
            if (err) throw err;

            let notes = JSON.parse(data);
            res.json(notes);
        });
    });
    // post request for api notes. receive new note on request of body, puts it in db.json, returns new note
    app.post("/api/notes", function (req, res) {
        fs.readFile("db/db.json", "utf8", (err, data) => {
            if (err) throw err;

            let notes = JSON.parse(data);

            let createNote = req.body
            let newId = (notes.length).toString();
            createNote.id = newId;
            console.log(createNote);
            notes.push(createNote);

            fs.writeFileSync("db/db.json", JSON.stringify(notes), "utf-8", (err, data) => {
                if (err) throw err;
                console.log("Note was created.")
            });

            res.json(notes);
        });
    });
// DELETE api/notes/:ID
    app.delete("/api/notes/:id", function (req, res) {
        fs.readFile("db/db.json", "utf8", (err, data) => {
            if (err) throw err;

            let notes = JSON.parse(data);
            let notesId = req.params.id;
            let newNotesId = 0;

            notes = notes.filter(currNote => {
                return currNote.id != notesId;
            });

            for (currNote of notes) {
                currNote.id = newNotesId.toString();
                newNotesId++;
            }

            fs.writeFileSync("db/db.json", JSON.stringify(notes), "utf8", (err, data) => {
                if (err) throw err;
                console.log("Success!");
            });

            res.json(notes);
        });
    });
}