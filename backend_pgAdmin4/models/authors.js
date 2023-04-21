const { Pool } = require('pg');
const queries = require('./queries');
const key = require('../utils/db_pgsql.js');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'postgres',
    password: key
});

//RUTAS AUTHORS
//GET ALL ATHORS
const getAllAuthors = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllAuthors)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

//GET del autor por email
const getAuthorsByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAuthorByEmail, [email])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// Postear un autor
const createAuthor = async (newAuthor) => {
    const { id_author, name, surname, email, image } = newAuthor;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createAuthor,[id_author, name, surname, email, image])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

//Actualizar un autor
const updateAuthor = async (author, key) => {
    const { name, surname, email, image } = author;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.updateAuthor,[name, surname, email, image, key])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// DELETE 
const deleteAuthor = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        console.log(email)
        const entriesOfAuthor = await client.query(queries.deleteEntriesByAuthor,[email])
        const data = await client.query(queries.deleteAuthor,[email])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const authors = {
    getAllAuthors,
    getAuthorsByEmail,
    createAuthor,
    updateAuthor,
    deleteAuthor
}

module.exports = authors;
