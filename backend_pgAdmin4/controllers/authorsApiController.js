const authors = require('../models/authors');

//Obtener todos los autores o uno por email
const getAllAuthors = async (req, res) => {
    let author;
    if (req.query.email) {
        author = await authors.getAuthorsByEmail(req.query.email);
    }
    else {
        author = await authors.getAllAuthors();
    }
    res.status(200).json(author); // [] con las entries encontradas
}

//postear un autor
//OBJETO PARA HACER LA PRUEBA DE POSTEAR

// {
//     "id_author": 19,
//     "name": "Pablo",
//     "surname": "Picapiedra",
//     "email": "SoyunEmail@thebridgeschool.es",
//     "image": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
//     }

const createAuthor = async (req, res) => {
    const newEntry = req.body; // {title,content,email,category}
    const response = await authors.createAuthor(newEntry);
    res.status(201).json({message: "usuario creado: " + req.body.email});
}

//actualizar un autor

//OBJETO PARA HACER LA PRUEBA PAR ACTUALIZAR
// {
//     "key": "Bocadillo@thebridgeschool.es",
//     "name": "Pacote",
//     "surname": "El_De_Los_BOcataS",
//     "email": "Bocadillo@thebridgeschool.es",
//     "image": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
//     }
const updateAuthor = async (req, res) => {
    const newEntry = req.body
    const key = req.body.key
    const response = await authors.updateAuthor(newEntry, key);
    res.status(200).json({message: "Se ha actualizado el autor: " + key})
}

//eleminar un autor

//Eliminar entry por title

const deleteAuthor = async (req, res) => {
    const email = req.body.email
    const response = await authors.deleteAuthor(email);
    res.status(200).json({message: "Se ha borrado el autor: " + email})
}


module.exports = {
    getAllAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
}