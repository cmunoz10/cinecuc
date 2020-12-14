const { Schema, model } = require("mongoose");

const peliculaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});

module.exports = model("pelicula", peliculaSchema);