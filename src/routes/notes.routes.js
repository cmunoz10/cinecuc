const express = require("express");
const router = express.Router();

// Controller
const {
    renderNoteForm,
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote,
    renderNotes2,
} = require("../controllers/notes.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// New Note
router.get("/notes/add", isAuthenticated, renderNoteForm);

router.get("/Admin/add", isAuthenticated, createNewNote);

router.post("/notes/nueva-funcion", isAuthenticated, createNewNote);

// Get All Notes
router.get("/notes", isAuthenticated, renderNotes);

router.get("/compra", isAuthenticated, renderNotes2);
// Edit Notes
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);

router.put("/notes/edit-note/:id", isAuthenticated, updateNote);

// Delete Notes
router.delete("/notes/delete/:id", isAuthenticated, deleteNote);

module.exports = router;