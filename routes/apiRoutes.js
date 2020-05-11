const fs = require("fs");
const path = require("path");

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), function (err, data) {
            if (err) throw err;
            res.json(JSON.parse(data));
        });
    });
    app.post("/api/notes", function (req, res) {
        const newNotes = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json")));
        newNotes.push(req.body);
        fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(newNotes), err => {
            if (err) throw err;
            res.send(200);
        });
    });
};