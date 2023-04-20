const authors = require('../models/authors');

//Obtener todos los autores o uno por email
//http://localhost:3000/api/authors?email=SimpatiLaura@gmail.es
//http://localhost:3000/api/authors
const getAllAuthors = async (req, res) => {
    try {
        let author;
        if (req.query.email) author = await authors.getAuthorsByEmail(req.query.email);
        else author = await authors.getAllAuthors();
        res.status(200).json(author);
    } catch (err) {
        res.status(400).json({ msj: err.message });
    };
};

//postear un autor
//OBJETO PARA HACER LA PRUEBA DE POSTEAR
// POST http://localhost:3000/api/authors
// {
//     "id_author": 200,
//     "name": "Abilio",
//     "surname": "papa",
//     "email": "EnElCielo@gmail.es",
//     "image": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
// }

const createAuthor = async (req, res) => {
    try {
        const newEntry = req.body;
        await authors.createAuthor(newEntry);
        res.status(201).json({ message: "usuario creado: " + req.body.email });
    } catch (err) {
        res.status(400).json({ msj: err.message });
    };
};

//actualizar un autor
// PUT http://localhost:3000/api/authors
//OBJETO PARA HACER LA PRUEBA PAR ACTUALIZAR
// {
//     "key": "Pabloperdioelemail@thebridgeschool.es"
//     "id_author": 2,
//     "name": "Para Actualizar",
//     "surname": "actualizado",
//     "email": "ParaActualizar@gmail.es",
//     "image": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
// }
const updateAuthor = async (req, res) => {
    try {
        const newEntry = req.body;
        const key = req.body.key;
        await authors.updateAuthor(newEntry, key);
        res.status(200).json({ message: "Se ha actualizado el autor: " + key });
    } catch (err) {
        res.status(400).json({ msj: err.message });
    };
};

//eleminar un autor
// DELETE http://localhost:3000/api/authors
//Eliminar entry por title

// {
//     "id_author": 1,
//     "name": "El Borrado",
//     "surname": "eliminado",
//     "email": "ParaBorrar@gmail.es",
//     "image": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
// }

const deleteAuthor = async (req, res) => {
    try {
        const email = req.body.email;
        await authors.deleteAuthor(email);
        res.status(200).json({ message: "Se ha borrado el autor: " + email });
    } catch (err) {
        res.status(400).json({ msj: err.message });
    };
};


module.exports = {
    getAllAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
};