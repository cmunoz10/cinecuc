const notesCtrl = {};

// Models
const Note = require("../models/Note");

notesCtrl.renderNoteForm = (req, res) => {
    res.render("notes/nueva-funcion");
};

notesCtrl.createNewNote = async(req, res) => {
    const { title, feini, fefin, lugar, direccion, cupos } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: "Por favor escribe un titulo" });
    }
    if (!feini) {
        errors.push({ text: "Por favor escribe una fecha de ini" });
    }
    if (!fefin) {
        errors.push({ text: "Por favor escribe una fecha de fin" });
    }
    if (!lugar) {
        errors.push({ text: "Por favor escribe un lugar" });
    }
    if (!direccion) {
        errors.push({ text: "Por favor escribe una direccion" });
    }
    if (!cupos) {
        errors.push({ text: "Por favor digite los cupos" });
    }
    if (errors.length > 0) {
        res.render("notes/nueva-funcion", {
            errors,
            title,
            feini,
            fefin,
            lugar,
            direccion,
            cupos,
        });
    } else {
        const newNote = new Note({ title, feini, fefin, lugar, direccion, cupos });
        newNote.user = req.user.id;
        console.log(newNote.user);
        await newNote.save();
        req.flash("success_msg", "Funcion agregada correctamente");
        res.redirect("/notes");
    }
};

notesCtrl.renderNotes = async(req, res) => {
    const notes = await Note.find()
        .sort({ date: "desc" })
        .lean();
    res.render("notes/all-funciones", { notes });
};
notesCtrl.renderNotes2 = async(req, res) => {
    const notes = await Note.find()
        .sort({ date: "desc" })
        .lean();
    res.render("notes/compra", { notes });
};


notesCtrl.renderEditForm = async(req, res) => {
    const note = await Note.findById(req.params.id).lean();
    if (note.user != req.user.id) {
        req.flash("error_msg", "no permitido");
        return res.redirect("/notes");
    }
    res.render("notes/edit-note", { note });
};

notesCtrl.updateNote = async(req, res) => {
    const { title, feini, fefin, lugar, direccion, cupos } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, feini, fefin, lugar, direccion, cupos });
    req.flash("success_msg", "Funcion actualizada correctamente");
    res.redirect("/notes");
};

notesCtrl.deleteNote = async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Funcion borrada correctamente");
    res.redirect("/notes");
};

module.exports = notesCtrl;