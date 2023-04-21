const entry = require('../models/entries'); // Importar el modelo de la BBDD

// GET http://localhost:3000/api/entries --> ALL
// GET http://localhost:3000/api/entries?email=PabMatMar@gmail.es --> por email

const getEntries = async (req, res) => {
    try {
        let entries;
        if (req.query.email) entries = await entry.getEntriesByEmail(req.query.email);
        else entries = await entry.getAllEntries();
        res.status(200).json(entries);
    } catch (err) {
        res.status(400).json({ msj: err.message });
    };
};

//Objeto para crear una entry:
// POST http://localhost:3000/api/entries
// {
//     "title":"Creando una entrada",
//     "content":"va a triunfar esto",
//     "email":"PabMatMar@gmail.es",
//     "category":"sucesos"
// }

const createEntry = async (req, res) => {
    try {
        const newEntry = req.body;
        const response = await entry.createEntry(newEntry);
        res.status(201).json({
            "items_created": response,
            data: newEntry
        });
    } catch (err) {
        res.status(400).json({ msj: err.message });
    };
};

//Objeto para eliminar una entry:(asegurarse de que no ha sido eliminada antes)
// DELETE http://localhost:3000/api/entries
// {
//     "title": "Esta noticia quiere que la elimines",
//     "content": "La verdad que nadie quiere oir",
//     "email": "PabMatMar@gmail.com",
//     "category": "Salud"
// }

const deleteEntry = async (req, res) => {
    try {
        const title = req.body.title;
        await entry.deleteEntry(title);
        res.status(200).json({ message: "Se ha borrado la entry" + title });
    } catch (err) {
        res.status(400).json({ msj: err.message });
    };
};

//Objeto para Actualizar entry:
// PUT http://localhost:3000/api/entries
// {
//     "title": "Noticia desde Node",
//     "content": "He sido actualizada",
//     "email": "PabMatMar@gmail.com",
//     "category": "trabajo"
// }

const updateEntry = async (req, res) => {
    try {
        const newEntry = req.body;
        const title = req.query.title;
        await entry.updateEntry(newEntry, title);
        res.status(200).json({ message: "Se ha actualizado la entry" + title });
    } catch (err) {
        res.status(400).json({ msj: err.message });
    };
};

module.exports = {
    getEntries,
    createEntry,
    deleteEntry,
    updateEntry
};