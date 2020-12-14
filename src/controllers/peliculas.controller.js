const peliculasCtrl = {};

// Models
const pelicula = require("../models/pelicula");

peliculasCtrl.renderPeliculaForm = (req, res) => {
    res.render("peliculas/nueva-pelicula");
};

peliculasCtrl.createNewPelicula = async(req, res) => {
    const { name, descripcion, director, genero } = req.body;
    const errors = [];
    if (!name) {
        errors.push({ text: "Ingrese un nombre " });
    }
    if (!descripcion) {
        errors.push({ text: "ingrese una descripcion" });
    }
    if (!director) {
        errors.push({ text: "Ingrese el nombre del director" });
    }
    if (!genero) {
        errors.push({ text: "genero" });
    }
    if (errors.length > 0) {
        res.render("peliculas/nueva-pelicula", {
            errors,
            nombre,
            descripion,
            director,
            genero,
        });
    } else {
        const newPelicula = new pelicula({ nombre, descripion, director, genero });
        newPelicula.user = req.user.id;
        console.log(newPelicula.user);
        await newPelicula.save();
        req.flash("success_msg", "Pelicula creada");
        res.redirect("/admin/add");
    }
};


module.exports = peliculasCtrl;