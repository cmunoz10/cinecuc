const { Schema, model } = require("mongoose");

const funcionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    feini: {
        type: String,
        required: true
    },
    fefin: {
        type: String,
        required: true
    },
    lugar: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    cupos: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },


}, {
    timestamps: true
});

module.exports = model("Note", funcionSchema);