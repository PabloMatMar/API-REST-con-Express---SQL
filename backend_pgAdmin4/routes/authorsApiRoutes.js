const express = require('express');
// Rutas de productos
const authorsApiController = require("../controllers/authorsApiController");
const authorsApiRouter = express.Router();


authorsApiRouter.get('/', authorsApiController.getAllAuthors);
authorsApiRouter.post('/', authorsApiController.createAuthor);
authorsApiRouter.put('/', authorsApiController.updateAuthor);
authorsApiRouter.delete('/', authorsApiController.deleteAuthor);

module.exports = authorsApiRouter;
